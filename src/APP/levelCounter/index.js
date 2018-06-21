import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../core/actions';


const LevelCounter = (props) => {

    /**
    *   Triggers the decrease level action
    */
    const DECREASE_LEVEL = (e) => {
        e.preventDefault();
        if(props.player[props.levelName] > 0 ) {
            props.actions.decreasePlayerLevel(props.player.id, props.levelName);
        }
        return false;
    }

    /**
    *   Triggers the increase level action
    */
    const INCREASE_LEVEL = (e) => {
        e.preventDefault();
        props.actions.increasePlayerLevel(props.player.id, props.levelName);
        return false;
    }

    return (
        <div className="levelCounter">
            <h3>{props.levelName}</h3>
            <button className="levelCounter__decrease-btn"
                onClick={DECREASE_LEVEL}>-</button>
            <p className="levelCounter__level">
                {props.player[props.levelName]}</p>
            <button className="levelCounter__increase-btn"
                onClick={INCREASE_LEVEL}>+</button>
        </div>
    )

}


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(null,mapDispatchToProps)(LevelCounter);
