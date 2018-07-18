import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AvatarSelector from '../avatarSelector/index';

import * as actionCreators from '../core/actions';

import CustomButton from '../button/index';


class DefeatScreen extends Component {
    constructor(props) {
        super(props);

        this.removePlayerHandler = this.removePlayerHandler.bind(this);

        this.updatePlayerHandler = this.updatePlayerHandler.bind(this);

        this.viewHandler = this.viewHandler.bind(this);

        this.state = {
            activePlayer: this.getPlayerData()
        }
    }

    render() {

        return (
            <div className="setupScreen view_wrap layout-setup_view">
                <div className="content__wrap">
                    <img className="stone_slab mobile_slab"
                        alt="stone slab"
                        src="assets/images/stone_slab_300.svg" />
                    <img className="stone_slab desktop_slab"
                        alt="stone slab"
                        src="assets/images/stone_slab_740x550.svg" />
                    <div className="slab__content">
                        <p>You can choose to continue playing with your
                        <span className="text_accent">current character</span>,
                        a <span className="text_accent">new character</span> or
                        <span className="text_accent">remove the defeated player
                        </span> from the game.</p>

                        <AvatarSelector />
                        <form onSubmit={this.updatePlayerHandler} id="updatePlayerForm">
                            <input id="playerNameEdit" name="playerNameEdit"
                                type="text"
                                autoFocus="true"
                                defaultValue={this.state.activePlayer.name}
                                autoComplete="off"
                                key={Date.now()}
                                />
                            <div className="form_group button_pair">
                                <CustomButton
                                    button_class="button--general"
                                    button_type="submit"
                                    button_text="Update player">
                                </CustomButton>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="button__wrap">
                    <CustomButton
                        button_class="button--secundary"
                        button_text="continue without player"
                        button_handler={this.removePlayerHandler}>
                    </CustomButton>
                    <CustomButton
                        button_class="start-btn button--primary"
                        button_handler={this.viewHandler}
                        button_text="continue game">
                    </CustomButton>
                </div>
            </div>

        );
    }

    /**
    *   get playerdata will get the player object for the active player
    */
    getPlayerData() {
        return this.props.playerList[this.props.activePlayer];
    }

    /**
    *   returns the template based on the type that has been passed
    */
    viewHandler(e) {
        e.preventDefault();

        this.props.actions.resetDefeatedPlayer(this.state.activePlayer.id);
        this.props.actions.updateGame();
        this.props.actions.updateView("turns");
    }


    /**
    *   fires the player update action
    */
    updatePlayerHandler(e) {
        e.preventDefault();

        const name = document.querySelector('#playerNameEdit').value || null;
        this.props.actions.updatePlayer(this.state.activePlayer.id, name);

        return false;
    }

    /**
    *  this action removes a player completely from the active game
    */
    removePlayerHandler(e) {
        e.preventDefault();

        this.props.actions.deletePlayer(this.state.activePlayer.id);
        this.props.actions.updateView("turns");

        return false;
    }

    /**
    *   returns the template based on the type that has been passed
    */
    clearInput(inputNodes) {
        const INPUTLIST = Array.from(inputNodes)

        for(let i = 0; i < INPUTLIST.length; i++)
        {
            INPUTLIST[i].value = "";
        }
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(DefeatScreen);
