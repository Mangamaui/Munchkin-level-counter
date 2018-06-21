import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../core/actions';


const AvatarSelector = (props) => {

    /**
    *   This returns the entire avatarObject of the selectedAvatar
    *   and stores it in CHAR.
    */
    const CHAR = props.availableAvatars.find((avatar) => {
        return avatar.id === props.selectedAvatar.characterID;
    });

    const ALTSTATE = props.selectedAvatar.alterEgoState;

    return (
        <div className="avatarSelector">
            <button className="btn controller controller-left"
                onClick={props.actions.previousAvatarListId}>
            previous</button>
            <div className="character">
                <img src={CHAR.alterEgo[ALTSTATE].image} alt="t"/>
            </div>
            <button className="btn controller controller-right"
                onClick={props.actions.nextAvatarListId}>next</button>
            <button className="btn"
                onClick={props.actions.toggleAlterEgo}>Toggle</button>
        </div>
    );

}


const mapStateToProps = (state) => {
    return {
        availableAvatars: state.app.availableAvatars,
        selectedAvatar: state.app.selectedAvatar
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarSelector);
