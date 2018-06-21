import {connect} from 'react-redux'
import React from 'react';

import Player from './index';

const PlayerList = ({playerList}) => {

    /**
    *   This generates the playerList html content
    */
    const LIST = playerList.map((player) => {
        return (
            <li key={player.id} className="player-wrap">
                <Player type="preview" player={player} />
            </li>);
    });

    return (
        <ul className="playerList">
            {LIST}
        </ul>
    )
}


const mapStateToProps = (state) => {
    return {
        playerList: state.app.gameSession.playerList
    };
}

export default connect(mapStateToProps)(PlayerList);
