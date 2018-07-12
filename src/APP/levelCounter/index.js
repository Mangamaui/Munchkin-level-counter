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
        <div className="level_counter">
            <h3 className="level_counter__label">{props.levelName}</h3>
            <button className="level_down level_counter__button level_counter__button_down icon-minus"
                onClick={DECREASE_LEVEL}></button>
            <p className="level_counter__level level">
                {props.player[props.levelName]}</p>
            <button className="level_up level_counter__button level_cunter__button_up icon-plus"
                onClick={INCREASE_LEVEL}></button>
        </div>
    )

}


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(null,mapDispatchToProps)(LevelCounter);
