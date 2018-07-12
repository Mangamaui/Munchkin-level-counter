import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AvatarSelector from '../avatarSelector/index';
import Player from '../player/index';

import * as actionCreators from '../core/actions';

import CustomButton from '../button/index';


class SetupScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.addPlayerHandler = this.addPlayerHandler.bind(this);
        this.removePlayerHandler = this.removePlayerHandler.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
                        src="assets/images/stone_slab_300.svg" />
                    <img className="stone_slab desktop_slab"
                        src="assets/images/stone_slab_740x550.svg" />
                    <div className="slab__content">
                        <p>Start by adding a minimum of 3 players and a maximum
                        of 6 players to your game</p>

                        <AvatarSelector />
                        {FORM}
                    </div>
                    <ul className="player_overview">
                        {LIST ? LIST : ""}
                    </ul>
                </div>
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
    *   returns the template based on the type that has been passed
    */
    handleInputChange(e) {
        const TARGET = e.target;
        const VALUE = TARGET.value;
        const NAME = TARGET.name;

        this.setState({
            [NAME]: VALUE
        });

    }

    /**
    *   returns the template based on the type that has been passed
    */
    addPlayerHandler(e) {
        e.preventDefault();
        let playerName = document.querySelector('#playerName').value || null;

        this.props.actions.addPlayer(playerName);
        this.clearInput(document.querySelectorAll('#playerName'));

        return false;
    }

    /**
    *   returns the template based on the type that has been passed
    */
    updatePlayerHandler(e) {
        e.preventDefault();
        const TARGET = e.currentTarget;

        if(this.props.editPlayer) {
            const name = this.state.playerName || null;

            this.props.actions.updatePlayer(this.props.editPlayer,name);
            this.clearInput(TARGET.querySelectorAll("input"));
        }
        return false;
    }

    /**
    *   returns the template based on the type that has been passed
    */
    removePlayerHandler(e) {
        e.preventDefault();
        const TARGET = e.currentTarget;
        this.props.actions.deletePlayer(this.state.playerID);

        this.clearInput(TARGET.querySelectorAll("input"));

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
            form = (
                <form onSubmit={this.updatePlayerHandler} id="updatePlayerForm">
                    <input id="playerName" name="playerName" type="text"
                        placeholder="Player name"
                        onChange={this.handleInputChange}/>
                    <div className="form_group">
                        <CustomButton
                            button_class="button--general"
                            button_type="submit"
                            button_text="Update player">
                        </CustomButton>
                    </div>
                </form>
            );
        } else {
            form = (
                <form onSubmit={this.addPlayerHandler} id="addPlayerForm">
                    <input id="playerName" name="playerName" type="text"
                        placeholder="Player name"
                        onChange={this.handleInputChange}/>
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
                if(index === 0) {
                    temp = <button className="add-btn"
                        onClick={this.addPlayerHandler}>
                        <i className="icon icon-plus"></i>
                        </button>;
                } else {
                    temp = <div className="placeholder"></div>;
                }

                return <li key={"item"+index}>{temp}</li>
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

        if(PLAYERLIST.length > 0) {
            return PLAYERLIST.map((player) => {
                let editable = false;
                let className = "player_overview__item";
                if(player.id === this.props.editPlayer) {
                    editable = true;
                    className += " player_overview__item--active";
                }
                return <li key={player.id} className={className}>
                    <Player player={player}
                    onChangeHandler={this.handleInputChange}
                    editable={editable} clickHandler={this.selectPlayer}/>
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
