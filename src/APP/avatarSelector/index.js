import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../core/actions';

import SquareButton from '../button/squareButton';


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
        <div className="avatar_selector">
            <SquareButton button_class="previous-btn button--tertiary"
                button_handler={props.actions.previousAvatarListId}
                button_text="previous">
                <i className="icon icon-arrow-left-thick"></i>
            </SquareButton>
            <div className="avatar">
                <img className="avatar__image"
                    src={CHAR.alterEgo[ALTSTATE].image} alt="t"/>
            </div>
            <SquareButton button_class="next-btn button--tertiary"
                button_handler={props.actions.nextAvatarListId}
                button_text="next">
                <i className="icon icon-arrow-right-thick"></i>
            </SquareButton>
            <button className="button button--toggle button--square"
                title="toggle alter ego"
                onClick={props.actions.toggleAlterEgo}>
                <i className="icon icon-user"></i>
            </button>
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
