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
    //<button className="btn" disabled={this.state.saveGame}>Continue previous game</button>

    render() {
        return (
            <div className="startScreen">
                <div className="msg">
                    <p>Welcome to the Munchkin Adventure Time Level Counter!
                        Start tracking your game by clicking "new game".</p>
                </div>
                <button className="btn" onClick={this.handleCreate}>
                    Start new game</button>
            </div>
        )
    }

    /**
    *   this will trigger the creategame function and sets the view to setup
    */
    handleCreate(e) {
        e.preventDefault();
       this.props.actions.createGame();
       this.props.actions.updateView("setup");
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

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
