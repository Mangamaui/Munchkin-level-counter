// start new game
// load game
// save game
// end game
// add player
// delete player
// update player

import { clearState } from './localstorage';
import store from '../store';

let playerID = 1;

const PLAYER = {
    id: "",
    name: "",
    avatar: "",
    tablePosition: 0,
    characterLevel: 0,
    gearLevel: 0,
    combatLevel: 0
}

export function updateView(view) {
    return {
        type: 'UPDATE_VIEW',
        payload: view
    }
}

export function createGame() {
    return {
        type: 'CREATE_GAME'
    }
}

export function loadGame() {
    return {
        type: 'LOAD_GAME'
    }
}

export function saveGame() {

    return {
        type: 'SAVE_GAME'
    }
}

export function updateGame() {

    return (dispatch, getState) => {
        const winner = checkForWinner();

        if(!winner) {
            dispatch({type: 'UPDATE_GAME'});
        } else {
            dispatch({
                type: 'UPDATE_VIEW',
                payload: 'winner'
            });
        }

    }

}

export function deleteGame() {
    clearState();
    return {
        type: 'DELETE_GAME'
    }
}

export function endGame(gameData) {
    return {
        type: 'END_GAME',
        payload: gameData
    }
}

export function addPlayer(playerName) {
    const id = playerID++;
    let name = playerName || `player ${id}`;

    return (dispatch, getState) => {

        if(getState().app.editPlayer !== null) {
            dispatch({
                type: 'UNSET_PLAYER_EDIT'
            })
        }

        const playerCopy = {...PLAYER,
            id: `player${id}`,
            name: name,
            avatar: getState().app.selectedAvatar
        }

        if (checkPlayerLimit()) {
            console.log("too many players");

            dispatch({
                type: 'MSG'
            });
        } else {


            dispatch({
                type: 'ADD_PLAYER',
                payload: playerCopy
            });
        }
    }
}

export function updatePlayer(playerID, playerName) {
    return(dispatch, getState) => {
        dispatch({
            type: 'UPDATE_PLAYER',
            payload: {
                id: playerID,
                name: playerName || null,
                avatar: getState().app.selectedAvatar
            }
        });
    }
}

export function decreasePlayerLevel(playerID, levelType) {
    return {
        type: 'DECREASE_PLAYER_LEVEL',
        payload: {
            id: playerID,
            levelType: levelType
        }
    }
}

export function increasePlayerLevel(playerID, levelType) {
    return {
        type: 'INCREASE_PLAYER_LEVEL',
        payload: {
            id: playerID,
            levelType: levelType
        }
    }
}

export function deletePlayer(playerID) {
    return {
        type: 'DELETE_PLAYER',
        payload: playerID
    }
}

export function setPlayerEdit(playerID) {
    return {
        type: 'SET_PLAYER_EDIT',
        payload: playerID
    }
}

export function nextAvatarListId() {
    return {
        type: 'NEXT_AVATAR_ID'
    }
}

export function previousAvatarListId() {
    return {
        type: 'PREVIOUS_AVATAR_ID'
    }
}

export function toggleAlterEgo() {
    return {
        type: 'TOGGLE_ALTEREGO'
    }
}

export function toggleEditMode() {
    return {
        type: 'TOGGLE_EDIT_MODE'
    }
}


/*============================================================================*/
/*                             Helper functions                               */
/*============================================================================*/
function checkForWinner() {
    const state = store.getState();
    return state.app.gameSession.playerList.find((player) => {
        return player.characterLevel === 10;
    });
}

function checkPlayerLimit() {
    const state = store.getState();

    if (state.app.gameSession.playerList.length === 6) {
        return true;
    }

    return false;
}
