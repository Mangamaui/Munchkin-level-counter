import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlayerList from '../player/playerList';
import * as actionCreators from '../core/actions';

import CustomButton from '../button/index';


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
        <div className="overviewScreen view_wrap layout-overview_view">
            <PlayerList />
            <div className="button__wrap">
                <CustomButton
                    button_class="button--primary"
                    button_handler={UPDATE_HANDLER}
                    button_text="start playing!">
                </CustomButton>
            </div>
        </div>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(OverviewScreen);
