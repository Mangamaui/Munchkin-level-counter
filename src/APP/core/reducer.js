import { avatarList } from '../avatars';
import { debugTools } from '../../debugTools';

const initialState = {
    gameSession: {
        playerList: [],
        activePlayer: null,
        nextPlayer: null,
        saveGame: false
    },
    editMode: false,
    selectedAvatar: {
        characterID: 1,
        alterEgoState: 0
    },
    availableAvatars: [...avatarList],
    editPlayer: null,
    view: 'start'
}


function app (state = initialState, action) {
    let currentChar, charPos, index = null;
    let availableAvatars, playerList, newSelection, currentPlayer,
        gameSessionCopy;

    switch(action.type) {
        /**
        *   Update view will set the requested view
        */
        case 'UPDATE_VIEW':
            return {...state, view: action.payload}

        /**
        *   Create game resets all data by returning a copy of the initial state
        */
        case 'CREATE_GAME':
            debugTools.log('game created');
            return {...initialState};

        /**
        *   Load game will the last localstorage entry
        */
        case 'LOAD_GAME':
            debugTools.log('game loaded');
            return state;

        /**
        *   Update game will update the active player to the next player in line
        *   and set a new next player
        */
        case 'UPDATE_GAME':
            debugTools.log('game updated');

            var activePlayer = state.gameSession.activePlayer;
            if(activePlayer === null) {
                activePlayer = 0;
            } else {
                activePlayer = state.gameSession.nextPlayer;
            }

            var nextPlayer = getNextPlayer(state.gameSession.playerList,
                activePlayer);

            gameSessionCopy = {...state.gameSession,
                activePlayer: activePlayer,
                nextPlayer: nextPlayer
             };

            return {...state,
                gameSession: gameSessionCopy};

        /**
        *   Add a new player to the gamesession and update the
        *   available avatarList
        */
        case 'ADD_PLAYER':
            debugTools.log('added player');
            playerList = [...state.gameSession.playerList, action.payload];

            newSelection = setSelectedAvatar(state.selectedAvatar,
                state.availableAvatars);
            availableAvatars = updateAvailableAvatars(playerList);

            return {...state,
                gameSession: { ...state.gameSession, playerList },
                availableAvatars: availableAvatars,
                selectedAvatar: newSelection
            };

        /**
        *   Update data from a specific player such as its name or avatar
        */
        case 'UPDATE_PLAYER':
            debugTools.log('update player');
            playerList = [...state.gameSession.playerList];
            index = playerList.findIndex(player => player.id === action.payload.id);
            playerList[index].avatar =  action.payload.avatar;

            newSelection = setSelectedAvatar(state.selectedAvatar,
                state.availableAvatars);
            availableAvatars = updateAvailableAvatars(playerList);

            if (action.payload.name !== null) {
                playerList[index].name = action.payload.name;
            }

            gameSessionCopy = {...state.gameSession, playerList: playerList};

            return {...state,
                gameSession: gameSessionCopy,
                availableAvatars: availableAvatars,
                selectedAvatar: newSelection,
                editPlayer: null
            };

        /**
        *   Based on the levelType that was passed on through payload,
        *   the corresponding level will be decreased
        */
        case 'DECREASE_PLAYER_LEVEL':
            playerList = [...state.gameSession.playerList];
            index = findObjectIndex(playerList, action.payload.id);
            currentPlayer = playerList[index];
            currentPlayer[action.payload.levelType] -=1;

            currentPlayer.combatLevel = updateCombatLevel(currentPlayer);
            playerList[index] = {...currentPlayer};

            return {...state,
                gameSession: { ...state.gameSession, playerList }};

        /**
        *   Based on the levelType that was passed on through payload,
        *   the corresponding level will be increased
        */
        case 'INCREASE_PLAYER_LEVEL':
            debugTools.log('increase player level');
            playerList = [...state.gameSession.playerList];
            const LEVELTYPE = action.payload.levelType;

            index = findObjectIndex(playerList, action.payload.id);
            currentPlayer = playerList[index];

            if (LEVELTYPE !== 'characterLevel' || currentPlayer['characterLevel'] < 10) {
                currentPlayer[LEVELTYPE] +=1;
                currentPlayer.combatLevel = updateCombatLevel(currentPlayer);
                playerList[index] = {...currentPlayer};
            }

            return {...state,
                gameSession: { ...state.gameSession, playerList }};


        /**
        *   reset the defeated player's gear level
        */
        case'RESET_DEFEATED_PLAYER':
            debugTools.log('reset defeated player gear level');
            playerList = [...state.gameSession.playerList];

            index = findObjectIndex(playerList, action.payload);
            currentPlayer = playerList[index];

            currentPlayer.gearLevel = 0;
            playerList[index] = {...currentPlayer};

            return {...state,
                gameSession: { ...state.gameSession, playerList }};

        /**
        *   This deletes a player from the gamesession
        */
        case 'DELETE_PLAYER':
            debugTools.log('delete player');

            playerList = state.gameSession.playerList.filter((player) => {
                return player.id !== action.payload.playerID;
            });

            let updatedPlayerList = playerList;

            if(action.payload.deletePhase === 'setup') {
                updatedPlayerList = updatePlayerList(playerList);
            }

            availableAvatars = updateAvailableAvatars(playerList);
            gameSessionCopy = {...state.gameSession, playerList: updatedPlayerList};

            return {...state,
                gameSession: gameSessionCopy,
                availableAvatars: availableAvatars};

        /**
        *   This sets an editable character, so that it can be edited in the
        *   frontend. It also updates the available avatarList so that the
        *   currently selected player's avatar is included in the results.
        */
        case 'SET_PLAYER_EDIT':
            debugTools.log('update selected player');
            const EDITPLAYER = action.payload;

            playerList = [...state.gameSession.playerList];
            availableAvatars = updateAvailableAvatars(playerList, action.payload);
            const CURRENTPLAYER = findPlayer(playerList, action.payload);
            let selectedAvatar = CURRENTPLAYER.avatar

            return {...state,
                availableAvatars: availableAvatars,
                selectedAvatar:  selectedAvatar,
                editPlayer: EDITPLAYER
            };

        /**
        *   resets the editableCharactar back to null and updates the available
        *   avatarList so that the previously selected player's avatar isn't
        *   included anymore
        */
        case 'UNSET_PLAYER_EDIT':
            debugTools.log('unset editable character');
            playerList = [...state.gameSession.playerList];
            newSelection = setSelectedAvatar(state.selectedAvatar,
                state.availableAvatars);

            availableAvatars = updateAvailableAvatars(playerList);

            return {...state,
                availableAvatars: availableAvatars,
                selectedAvatar: newSelection,
                editPlayer: null
            };

        /**
        *   sets the selected avatar to the next in line
        */
        case 'NEXT_AVATAR_ID':
            debugTools.log("next id");
            currentChar = {...state.selectedAvatar};
            charPos = findObjectIndex(state.availableAvatars,
                currentChar.characterID);

            currentChar.characterID = state.availableAvatars[0].id;

            if (charPos < state.availableAvatars.length - 1) {
                charPos += 1;
                currentChar.characterID = state.availableAvatars[charPos].id
            }

            return {...state, selectedAvatar: currentChar };

        /**
        *   sets the selected avatar to the previous avatar in line
        */
        case 'PREVIOUS_AVATAR_ID':
            debugTools.log('previous id');
            currentChar = {...state.selectedAvatar};
            charPos = findObjectIndex(state.availableAvatars,
                currentChar.characterID);

            if (charPos > 0) {
                charPos -= 1
                currentChar.characterID = state.availableAvatars[charPos].id
            } else {
                const copy = [...state.availableAvatars].reverse();
                currentChar.characterID = copy[0].id;
            }

            return {...state, selectedAvatar: currentChar };

        /**
        *   Toggles between the alter ego states of each avatar
        */
        case 'TOGGLE_ALTEREGO':
            debugTools.log('toggle alt');
            currentChar = {...state.selectedAvatar};
            currentChar.alterEgoState = state.selectedAvatar.alterEgoState === 0 ? 1 : 0;

            return {...state, selectedAvatar: currentChar };

        case 'TOGGLE_EDIT_MODE':
            debugTools.log('toggle editMode');
            const editMode = state.editMode === false ? true : false;

            return {...state, editMode};

        default:
            return state;
    }
}

export default app;


/*============================================================================*/
/*                             Helper functions                               */
/*============================================================================*/



/**
*   renamePlayers loops over the players objects and updates their id and name
*   (only automatic generated names) based on their position in the list
*/
function updatePlayerList (playerList) {
    debugTools.log('Update Player list');
    let counter = 1;

    playerList.forEach((player) => {
        player.id = `player${counter}`;

        if(player.name.includes('player')) {
            player.name = `player ${counter}`;
        }
        counter++;
    })

    return playerList;
}

/**
*   setSelectedAvatar takes the currently selected Avatar
*   and returns the next in line. When you reach the end of the array,
*   the next in line will be the very first element again.
*/
function setSelectedAvatar (previousChar, availableAvatars) {
    debugTools.log('set selected avatar');
    // we start from the previous char to set the current one
    const CURRENTCHAR = {...previousChar};

    let charPos = findObjectIndex(availableAvatars, CURRENTCHAR.characterID);
    charPos += 1; //increase to select the next char

    if(charPos < availableAvatars.length - 1) {
        CURRENTCHAR.characterID = availableAvatars[charPos].id;
    } else {
        CURRENTCHAR.characterID = availableAvatars[0].id;
    }
    return CURRENTCHAR;
}

/**
*   updateAvailableAvatars will filter out all avatars that are in use
*   by players from the playerList. Except when a playerID is being passed,
*   this will inlcude the avatar from that specific player.
*/
function updateAvailableAvatars (playerList, playerID = null) {
    debugTools.log("update available chars");
    const AVATARLIST_COPY = [...avatarList];
    const PLAYERCHARS = generatePlayerCharacterIDList(playerList);
    let currentPlayer = null;
    let avatar = null;

    if(playerID !== null) {
        currentPlayer = findPlayer(playerList, playerID);
        avatar = currentPlayer.avatar.characterID;
    }

    const AVAILABLE_AVATARS = AVATARLIST_COPY.filter((character) => {
        return (!PLAYERCHARS.includes(character.id) || character.id === avatar);
    });

    return AVAILABLE_AVATARS;
}
/**
*   generatePlayerCharacterIDList will create an array of avatarID's
*   that are in use.
*/
function generatePlayerCharacterIDList (playerList) {
    debugTools.log("generate player character ID-list");
    return playerList.map(player => player.avatar.characterID);
}

/**
*   findPlayer will return a specific player object from the playerList
*   after it is matched by ID
*/
function findPlayer (playerList, playerID) {
    debugTools.log('find player');
    return playerList.find((player) => {
        return player.id === playerID;
    } )
}

/**
*   findPlayer will return a specific player object from the playerList
*   after it is matched by ID
*/
function findObjectIndex (arr, id) {
    return arr.findIndex(item => item.id === id);
}

/**
*   updateCombatLevel returns the sum of characterlevel and gearLevel
*   combatlevel = characterLevel + gearLevel
*/
function updateCombatLevel (player) {
    return player.characterLevel + player.gearLevel;
}

/**
*   getNextPlayer will return which player follows after activePlayer
*/
function getNextPlayer (playerList, activePlayer) {
    var nextPlayer =  null;

    if(activePlayer < playerList.length-1) {
        nextPlayer = activePlayer+1;
    } else {
        nextPlayer = 0;
    }

    return nextPlayer;
}
