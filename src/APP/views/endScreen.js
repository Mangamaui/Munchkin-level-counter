import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { avatarList } from '../avatars';

import * as actionCreators from '../core/actions';

import CustomButton from '../button/index';


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
        <div className="endScreen view_wrap layout-end_view">
            <div className="content__wrap winner">
                <img className="stone_slab mobile_slab"
                    alt="stone slab"
                    src="assets/images/stone_slab_300.svg" />
                <img className="stone_slab desktop_slab"
                    alt="stone slab"
                    src="assets/images/stone_slab_740x550.svg" />
                <p className="winner__name">
                    <span>{WINNER.name}</span> wins the game</p>
                <img className="winner__avatar"
                    src={AVATAR.alterEgo[EGO].image}
                    height="100"
                    width="100"
                    alt={AVATAR.alterEgo[EGO].name} />
                <p className="winner__text">Time for another round?</p>
            </div>
            <div className="button__wrap">
                <CustomButton
                    button_class="button--primary"
                    button_handler={RESTART_HANDLER}
                    button_text="start new game">
                </CustomButton>
            </div>
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
