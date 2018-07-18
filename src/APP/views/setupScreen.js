import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AvatarSelector from '../avatarSelector/index';
import Player from '../player/index';

import * as actionCreators from '../core/actions';

import CustomButton from '../button/index';
import SquareButton from '../button/squareButton';


class SetupScreen extends Component {
    constructor(props) {
        super(props);

        this.addPlayerHandler = this.addPlayerHandler.bind(this);
        this.removePlayerHandler = this.removePlayerHandler.bind(this);

        this.selectPlayer = this.selectPlayer.bind(this);
        this.updatePlayerHandler = this.updatePlayerHandler.bind(this);

        this.viewHandler = this.viewHandler.bind(this);
    }

    render() {
        const LIST = this.createPlayerList();
        const FORM = this.setForm();

        const PLAYERCOUNT = this.props.gameSession.playerList.length;
        let disabled = PLAYERCOUNT < 3;

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
                        <p>Start by adding a minimum of 3 players and a maximum
                        of 6 players to your game</p>

                        <AvatarSelector />
                        {FORM}
                    </div>
                </div>
                <ul className="player_overview">
                    {LIST ? LIST : ""}
                </ul>
                <div className="button__wrap">
                    <CustomButton
                        button_class="start-btn button--primary"
                        button_handler={this.viewHandler}
                        button_text="continue"
                        disabled={disabled}>
                    </CustomButton>
                </div>
            </div>

        );
    }

    /**
    *   returns the template based on the type that has been passed
    */
    viewHandler(e) {
        e.preventDefault();
        this.props.actions.updateView("overview");
    }

    /**
    *   Fires the addPlayer action, but only when there's no player to edit.
    *   In that case it will first unset the player to edit.
    */
    addPlayerHandler(e) {
        e.preventDefault();

        if(!this.props.editPlayer) {
            let playerNameInput = document.querySelector('#playerName')
            let playerName = playerNameInput ? playerNameInput.value : null;

            this.props.actions.addPlayer(playerName);
            this.clearInput(document.querySelectorAll('input'));
        } else {
            this.props.actions.unsetPlayerEdit();
            this.clearInput(document.querySelectorAll('input'));
        }

        return false;
    }

    quickAddHandler(e) {
        e.preventDefault();
        if(!this.props.editPlayer) {

        }
        return false;
    }

    /**
    *   fires the player update action
    */
    updatePlayerHandler(e) {
        e.preventDefault();
        const TARGET = e.currentTarget;

        if(this.props.editPlayer) {
            const name = document.querySelector('#playerNameEdit').value || null;

            this.props.actions.updatePlayer(this.props.editPlayer,name);
            this.clearInput(TARGET.querySelectorAll("input"));
        }
        return false;
    }

    /**
    *   triggers the delete player action
    */
    removePlayerHandler(e) {
        e.preventDefault();
        const TARGET = e.currentTarget;

        this.props.actions.deletePlayer(this.props.editPlayer);

        this.clearInput(TARGET.querySelectorAll('input'));

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

    /**
    *   setForm will return the correct form depending on wether a player is
    *   selected to be edited. In that case it will return the form that allows
    *   the user to edit the player's properties.
    */
    setForm() {
        let form;

        if(this.props.editPlayer) {
            const player = this.getPlayerData(this.props.editPlayer);

            form = (
                <form onSubmit={this.updatePlayerHandler} id="updatePlayerForm">
                    <input id="playerNameEdit" name="playerNameEdit"
                        type="text"
                        autoFocus="true"
                        defaultValue={player.name}
                        autoComplete="off"
                        key={Date.now()}
                        />
                    <div className="form_group button_pair">
                        <CustomButton
                            button_class="button--general"
                            button_type="submit"
                            button_text="Update player">
                        </CustomButton>
                        <SquareButton
                            button_class="button--square button--trash"
                            button_text="delete"
                            button_handler={this.removePlayerHandler}
                        ><i className="icon icon-trash"></i>
                        </SquareButton>
                    </div>
                </form>
            );
        } else {
            form = (
                <form onSubmit={this.addPlayerHandler} id="addPlayerForm">
                    <input id="playerName" name="playerName"
                        type="text"
                        autoFocus="true"
                        placeholder="Player name" defaultValue={""}
                        autoComplete="off"
                        key={Date.now()}
                        />
                    <div className="form_group">
                        <CustomButton
                            button_class="button--general"
                            button_type="submit"
                            button_text="add player">
                        </CustomButton>
                    </div>
                </form>
            );

        }

        return form;
    }

    /**
    *   This generates the list of placeholders and players
    */
    createPlayerList() {
        const MAX = 6;
        const LENGTH = this.props.gameSession.playerList.length;
        const AMOUNT = MAX - LENGTH;

        const PLACEHOLDERS = this.generatePlaceholders(AMOUNT);
        const PLAYERLIST = this.fillPlayerList();

        return [...PLAYERLIST, ...PLACEHOLDERS];
    }

    /**
    *   This generates the amount of player slots that are still available
    *   for this gamesession
    */
    generatePlaceholders(amount) {
        if(amount > 0) {
            let list = [];

            //generate placeholder array based on received amount
            for(let i = 0; i < amount; i++) {
                list.push(null);
            }

            return list.map((item, index) => {
                let temp;
                const editClass =  this.props.editPlayer ? "button__circular--edit" : "";
                if(index === 0) {
                    temp = <button className={"button__circular "+ editClass }
                        onClick={this.addPlayerHandler}>
                        <i className="icon icon-plus"></i>
                        </button>;
                } else {
                    temp = <div className="placeholder"></div>;
                }

                return <li key={"item" + index}>{temp}</li>
            });

        } else {
            return [];
        }

    }

    /**
    *   fillPlayerList will create a li for each player in the playerList
    */
    fillPlayerList() {
        const PLAYERLIST = this.props.gameSession.playerList;
        let index = 0;

        if(PLAYERLIST.length > 0) {
            return PLAYERLIST.map((player) => {
                let editable = false;
                let className = "player_overview__item";

                if(player.id === this.props.editPlayer) {
                    editable = true;
                    className += " player_overview__item--active";
                }

                return <li key={index++} className={className}>
                    <Player player={player}
                    editable={editable}
                    clickHandler={this.selectPlayer}/>
                </li>
            });
        } else {
            return [];
        }
    }

    /**
    *   selectPlayer marks and selects which player a user might want to edit.
    */
    selectPlayer(e) {
        e.preventDefault();
        const TARGET = e.currentTarget;

        if(this.props.editPlayer !== TARGET.dataset.id) {
            this.props.actions.setPlayerEdit(TARGET.dataset.id);
        }


        return false;
    }

    /**
    *   getPlayerData returns the player object based on a matching ID
    */
    getPlayerData(id) {
        return this.props.gameSession.playerList.find((player) => {
            return player.id === id;
        })
    }

}


const mapStateToProps = (state) => {
    return {
        editPlayer: state.app.editPlayer,
        gameSession: state.app.gameSession,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupScreen);
