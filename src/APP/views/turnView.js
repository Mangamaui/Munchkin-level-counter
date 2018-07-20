import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../core/actions';
import Player from '../player/index';

import CustomButton from '../button/index';


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

    const DEFEATED_PLAYER_HANDLER = (e) => {
        e.preventDefault();
        props.actions.setPlayerEdit(CURRENT_PLAYER.id);
        props.actions.updateView("defeat");
    }

    return (
        <div className="turnScreen layout-turn-view view-wrap">
            <div className="content__wrap">
                <Player type="full-view"
                    player={CURRENT_PLAYER}
                    handler={DEFEATED_PLAYER_HANDLER} />
            </div>
            <div className="button__wrap">
                <CustomButton
                    button_class="button--primary"
                    button_handler={NEXT_PLAYER_HANDLER}
                    button_text="end turn">
                </CustomButton>
            </div>
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
