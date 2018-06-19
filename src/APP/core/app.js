import React, { Component } from 'react';
import { connect } from 'react-redux';

import StartScreen from '../views/startScreen';
import SetupScreen from '../views/setupScreen';
import OverviewScreen from '../views/overviewScreen';
import TurnView from '../views/turnView';
import EndScreen from '../views/endScreen';


class App extends Component {

    render() {
        const view = this.switchViews(this.props.view);

        return (
            <div className="App">
                <header>
                    <h1>Munchkin levelcounter</h1>
                </header>
                <div className="container">
                    {view}
                </div>
            </div>
        );
    }

    switchViews(view) {
        // startview
        // add players
        // overview / order
        // turn / playerDetail
        // Winner

            switch(view) {
                case "start":
                    return (<StartScreen />);

                case "setup":
                    return (<SetupScreen />);

                case "overview":
                    return (<OverviewScreen />);

                case "turns":
                    return (<TurnView />);

                case "winner":
                    return (<EndScreen />);

                default:
                    return (<div>404</div>);
            }
    }
}

const mapStateToProps = (state) => {
    return {
        view: state.app.view,
    };
}

export default connect(mapStateToProps, null)(App);
