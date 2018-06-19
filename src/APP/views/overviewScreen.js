import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlayerList from '../player/playerList';
import * as actionCreators from '../core/actions';



class OverviewScreen extends Component {
    constructor(props) {
        super(props);

        this.buttonHandler = this.buttonHandler.bind(this);
    }


    buttonHandler(e) {
        e.preventDefault();
        this.props.actions.updateGame();
        this.props.actions.updateView("turns");

    }

    render() {
        return (
            <div>
                <PlayerList />
                <button className="btn" onClick={this.buttonHandler}>Start Playing!</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(OverviewScreen);
