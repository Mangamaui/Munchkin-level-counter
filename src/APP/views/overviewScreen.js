import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlayerList from '../player/playerList';
import * as actionCreators from '../core/actions';


const OverviewScreen = (props) => {

    /**
    *   triggers a game update, such as load a new active player and set the next
    */
    const UPDATE_HANDLER = (e) => {
        e.preventDefault();
        props.actions.updateGame();
        props.actions.updateView("turns");
    }

    return (
        <div>
            <PlayerList />
            <button className="btn"
                onClick={UPDATE_HANDLER}>Start Playing!</button>
        </div>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(OverviewScreen);
