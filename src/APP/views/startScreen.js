import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../core/actions';
import CustomButton from '../button/index';

import { checkState } from '../core/localstorage';


class StartScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            saveGame: checkState()
         };

        this.handleCreate = this.handleCreate.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    render() {
        return (
            <div className="startScreen view_wrap layout-start_view">
                <div className="content__wrap">
                    <img className="stone_slab mobile_slab"
                        src="assets/images/stone_slab_300.svg"
                        alt="stone slab" />
                    <img className="stone_slab desktop_slab"
                        src="assets/images/stone_slab_900.svg"
                        alt="stone slab" />
                    <div className="text_wrap">
                        <p>Welcome to the Munchkin Adventure Time Level Counter!
                        <br /> Start tracking your game by clicking "new game".</p>
                    </div>
                </div>
                <div className="button__wrap">
                    <CustomButton button_class="button button--secundary"
                    button_handler={this.handleLoad}
                        button_text="Continue previous game"
                        disabled={!this.state.saveGame}>
                    </CustomButton>
                    <CustomButton button_class="start-btn button--primary"
                        button_handler={this.handleCreate}
                        button_text="start new game">
                    </CustomButton>
                </div>
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

    handleLoad(e) {
        e.preventDefault();
        this.props.actions.loadGame();
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
