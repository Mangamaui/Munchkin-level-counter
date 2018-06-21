import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../core/actions';
import Player from '../player/index';


const TurnView = (props) => {

    /**
    *   This switches the app to the next player's turn
    */
    const NEXT_PLAYER_HANDLER = (e) => {
        e.preventDefault();
        props.actions.updateGame();
    }

    /**
    *   get playerdata will get the player object for the active player
    */
    const GET_PLAYERDATA = () => {
        return props.playerList[props.activePlayer];
    }

    const CURRENT_PLAYER = GET_PLAYERDATA();

    return (
        <div>
            <Player type="full-view" player={CURRENT_PLAYER} />
            <button className="btn"
                onClick={NEXT_PLAYER_HANDLER}>End turn</button>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        playerList: state.app.gameSession.playerList,
        activePlayer: state.app.gameSession.activePlayer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TurnView);
