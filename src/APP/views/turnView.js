import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../core/actions';
import Player from '../player/index';


class TurnView extends Component {
    constructor(props) {
        super(props);

        //console.log(this.props.gameSession.activePlayer);
        this.nextPlayerHandler = this.nextPlayerHandler.bind(this);
    }

    nextPlayerHandler(e) {
        e.preventDefault();
        this.props.actions.updateGame();
        //this.props.actions.updateView("turns");
    }

    getPlayerData() {
        return this.props.playerList[this.props.activePlayer];
    }

    render() {
        const currentPlayer = this.getPlayerData();

        return (
            <div>
                <Player type="full-view" player={currentPlayer} />
                <button className="btn" onClick={this.nextPlayerHandler}>End turn</button>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(TurnView);
