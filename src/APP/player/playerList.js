import {connect} from 'react-redux'
import React from 'react';

import Player from './index';

const PlayerList = ({playerList}) => {

    /**
    *   This generates the playerList html content
    */
    const LIST = playerList.map((player) => {
        return (<Player type="preview" player={player} key={player.id} />);
    });

    return (
        <div className="playerList">
            {LIST}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        playerList: state.app.gameSession.playerList
    };
}

export default connect(mapStateToProps)(PlayerList);
