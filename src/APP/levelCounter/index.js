import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../core/actions';

const LevelCounter = (props) => {

    const decreaseLevel = (e) => {
        e.preventDefault();
        if(props.player[props.levelName] > 0 ) {
            props.actions.decreasePlayerLevel(props.player.id, props.levelName);
        }
        return false;
    }

    const increaseLevel = (e) => {
        e.preventDefault();
        props.actions.increasePlayerLevel(props.player.id, props.levelName);
        return false;
    }

    return (
        <div className="levelCounter">
            <h3>{props.levelName}</h3>
            <button className="levelCounter__decrease-btn" onClick={decreaseLevel}>-</button>
            <p className="levelCounter__level">{props.player[props.levelName]}</p>
            <button className="levelCounter__increase-btn" onClick={increaseLevel}>+</button>
        </div>
    )


}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(null,mapDispatchToProps)(LevelCounter);
