import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AvatarSelector from '../avatarSelector/index';
import Player from '../player/index';
//import PlayerList from '../player/playerList';
import * as actionCreators from '../core/actions';

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
        const list = this.createPlayerList();
        const form = this.showForm();

        return (
            <div>
                <p>Start by adding a minimum of 3 players and a maximum of 6 players to your game</p>
                <div className="playerbox">
                    <AvatarSelector />
                    {form}
                    <ul className="playerOverview">{list ? list : ""}</ul>
                </div>
                <button className="btn" onClick={this.viewHandler}>Continue</button>
            </div>

        );
    }

    viewHandler(e) {
        e.preventDefault();
        this.props.actions.updateView("overview");
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    addPlayerHandler(e) {
        e.preventDefault();
        let playerName = document.querySelector('#playerName').value || null;

        this.props.actions.addPlayer(playerName);
        this.clearInput(document.querySelectorAll('#playerName'));

        return false;
    }

    updatePlayerHandler(e) {
        e.preventDefault();
        const target = e.currentTarget;

        if(this.props.editPlayer) {
            const name = this.state.playerName || null;

            this.props.actions.updatePlayer(this.props.editPlayer,name);
            this.clearInput(target.querySelectorAll("input"));
        }
        return false;
    }

    removePlayerHandler(e) {
        e.preventDefault();
        const target = e.currentTarget;
        this.props.actions.deletePlayer(this.state.playerID);

        this.clearInput(target.querySelectorAll("input"));

        return false;
    }


    clearInput(inputNodes) {
        const inputList = Array.from(inputNodes)

        for(let i = 0; i < inputList.length; i++)
        {
            inputList[i].value = "";
        }
    }

    /**
    *   showForm will return the correct form depending on wether a player is
    *   selected to be edited. In that case it will return the form that allows
    *   the user to edit the player's properties.
    */
    showForm() {
        let form;

        if(this.props.editPlayer) {
            form = (
                <form onSubmit={this.updatePlayerHandler} id="updatePlayerForm">
                    <label htmlFor="playerName">Add the player name:</label><br />
                    <input id="playerName" name="playerName" type="text" placeholder="Player name" onChange={this.handleInputChange}/>
                    <button className="btn" type="submit" form="updatePlayerForm">Update player</button>
                </form>
            );
        } else {
            form = (
                <form onSubmit={this.addPlayerHandler} id="addPlayerForm">
                    <label htmlFor="playerName">Add the player name:</label><br />
                    <input id="playerName" name="playerName" type="text" placeholder="Player name" onChange={this.handleInputChange}/>
                    <button className="btn" type="submit" form="addPlayerForm">Add player</button>
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
        const playerListLength = this.props.gameSession.playerList.length;
        const amount = MAX - playerListLength;

        const placeholders = this.generatePlaceholders(amount);
        const playerList = this.fillPlayerList();

        return [...playerList, ...placeholders];
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
                    temp = <button className="add-btn" onClick={this.addPlayerHandler}>Add</button>;
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
        const playerList = this.props.gameSession.playerList;

        if(playerList.length > 0) {
            return playerList.map((player) => {
                let editable = false;
                let className = "player-preview";
                if(player.id === this.props.editPlayer) {
                    editable = true;
                    className += " player-preview--active";
                }
                return <li key={player.id} className={className}><Player player={player} onChangeHandler={this.handleInputChange} editable={editable} clickHandler={this.selectPlayer}/></li>
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
        const target = e.currentTarget;

        if(this.props.editPlayer !== target.dataset.id) {
            e.currentTarget.classList.add("player-preview--active");

            this.props.actions.setPlayerEdit(target.dataset.id);
        }
        return false;
    }

}

const mapStateToProps = (state) => {
    return {
        editPlayer: state.app.editPlayer,
        // editMode: state.app.editMode,
        gameSession: state.app.gameSession,
        //selectedAvatar: state.app.selectedAvatar
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupScreen);
