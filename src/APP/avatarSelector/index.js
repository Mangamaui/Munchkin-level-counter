import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../core/actions';


class AvatarSelector extends Component {

    render() {
        const CHAR = this.props.availableAvatars.find((char) => {

            return char.id === this.props.selectedAvatar.characterID;
        });
        const ALTSTATE = this.props.selectedAvatar.alterEgoState;

        return (
            <div className="avatarSelector">
                <button className="btn controller controller-left" onClick={this.props.actions.previousAvatarListId}>previous</button>
                <div className="character">
                    <img src={CHAR.alterEgo[ALTSTATE].image} alt="t"/>
                </div>
                <button className="btn controller controller-right" onClick={this.props.actions.nextAvatarListId}>next</button>
                <button className="btn" onClick={this.props.actions.toggleAlterEgo}>Toggle</button>
            </div>
        );
    }

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
