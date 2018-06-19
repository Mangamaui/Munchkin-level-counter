import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../core/actions';


class StartScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            saveGame: false
         };

        this.handleCreate = this.handleCreate.bind(this);
    }

    render() {
        return (
            <div className="startScreen">
                <div className="msg"><p>Welcome to the Munchkin Adventure Time Level Counter! Start tracking your game by clicking "new game".</p></div>
                <button className="btn" disabled={this.state.saveGame}>Continue previous game</button>
                <button className="btn" onClick={this.handleCreate} >Start new game</button>
            </div>
        )
    }

    handleCreate(e) {
       this.props.actions.createGame();
       this.props.actions.updateView("setup");
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

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
