import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { avatarList } from '../avatars';

import * as actionCreators from '../core/actions';

class EndScreen extends Component {
    constructor(props) {
        super(props);

        this.restartHandler = this.restartHandler.bind(this);
    }

    render() {
        const winner = this.getWinner();
        const ego = winner.avatar.alterEgoState;
        const avatar = this.getAvatar(winner);

        return (
            <div>
                <p><span>{winner.name}</span> wins the game</p>
                <div><img src={avatar.alterEgo[ego].image}  height="100" width="100" alt={avatar.alterEgo[ego].name}/></div>

                <button onClick={this.restartHandler}>Time for another round?</button>
            </div>
        )
    }
    restartHandler(e) {
        e.preventDefault();
        this.props.actions.createGame();;
        this.props.actions.updateView("setup");
    }

    getWinner(){
        return this.props.playerList.find((player) => {
            return player.characterLevel === 10;
        })
    }

    getAvatar(winner) {
        return avatarList.find((avatar) => {
            return avatar.id === winner.avatar.characterID;
        });
    }
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
