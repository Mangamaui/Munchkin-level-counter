import React from 'react';
import { connect } from 'react-redux';

import StartScreen from '../views/startScreen';
import SetupScreen from '../views/setupScreen';
import OverviewScreen from '../views/overviewScreen';
import TurnView from '../views/turnView';
import DefeatScreen from '../views/defeatScreen';
import EndScreen from '../views/endScreen';

const App = (props) => {
    /**
    *   Switch views will load the corresponding view component
    */
    const SWITCH_VIEWS = (view) => {

        switch(view) {
            case "start":
                return (<StartScreen />);

            case "setup":
                return (<SetupScreen />);

            case "overview":
                return (<OverviewScreen />);

            case "turns":
                return (<TurnView />);

            case "defeat":
                return(<DefeatScreen />);

            case "winner":
                return (<EndScreen />);

            default:
                return (<div>404</div>);
        }
    }

    const VIEW = SWITCH_VIEWS(props.view);
    return (
        <React.Fragment>
            {VIEW}
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        view: state.app.view,
    };
}

export default connect(mapStateToProps, null)(App);
