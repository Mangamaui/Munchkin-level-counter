import app from '../APP/core/reducer';
import { avatarList } from '../APP/avatars';

const filteredList = [...avatarList];
filteredList.splice(0,1);

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
    view: "start"
}

const player = {
    id: "player01",
    name: "Finn",
    avatar: {characterID: 1, alterEgoState: 0},
    tablePosition: 0,
    characterLevel: 0,
    gearLevel: 0,
    combatLevel: 0
}

const alteredState = {...initialState,
    gameSession: {
        ...initialState.gameSession,
        playerList: [player]
    },
    selectedAvatar: {
        characterID: 2,
        alterEgoState: 0
    },
    availableAvatars: filteredList
}

const deletedPlayerState = {...initialState,
    selectedAvatar: {
        characterID: 2,
        alterEgoState: 0
    }
}

describe('core reducer', () => {
    it('should return the initial state', () => {
        expect(app(undefined, {})).toEqual(initialState);
    })

    it('should add a new player to the playerList', () => {
        expect(app(initialState, {type: 'ADD_PLAYER', payload: player})).toEqual(alteredState)
    })

    it('should remove a player from the playerList', () => {
        expect(app(alteredState, {type: 'DELETE_PLAYER', payload: player.id})).toEqual(deletedPlayerState)
    })

    it('should toggle the alter Ego state of a character', () => {
        const newState = {...initialState, selectedAvatar: {characterID:1, alterEgoState:1}}

        expect(app(initialState, {type: 'TOGGLE_ALTEREGO'})).toEqual(newState)
    })

})
