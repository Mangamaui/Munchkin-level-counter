import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { avatarList } from '../avatars';

import * as actionCreators from '../core/actions';


const EndScreen = (props) => {

    /**
    *   triggers the create new game action and moves back to the setup view
    */
    const RESTART_HANDLER = (e) => {
        e.preventDefault();
        props.actions.createGame();
        props.actions.updateView("setup");
    }

    /**
    *   returns a winner
    */
    const GET_WINNER = () => {
        return props.playerList.find((player) => {
            return player.characterLevel === 10;
        })
    }

    /**
    *   returns the avatar object based on the id
    */
    const GET_AVATAR = (winner) => {
        return avatarList.find((avatar) => {
            return avatar.id === winner.avatar.characterID;
        });
    }


    const WINNER = GET_WINNER();
    const EGO = WINNER.avatar.alterEgoState;
    const AVATAR = GET_AVATAR(WINNER);

    return (
        <div>
            <p><span>{WINNER.name}</span> wins the game</p>
            <div><img src={AVATAR.alterEgo[EGO].image}  height="100" width="100" alt={AVATAR.alterEgo[EGO].name}/></div>

            <button onClick={RESTART_HANDLER}>Time for another round?</button>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        playerList: state.app.gameSession.playerList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EndScreen);
