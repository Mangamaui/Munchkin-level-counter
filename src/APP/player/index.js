import React, { Component } from 'react';
import { avatarList } from '../avatars';

import LevelCounter from '../levelCounter';

class Player extends Component {

    render() {
        const player = this.props.player;
        const ego = player.avatar.alterEgoState;
        const avatar = this.getAvatar();
        const template = this.getTemplate(this.props.type);

        return (
            <div className="player" onClick={this.props.clickHandler} data-id={player.id}>
                <div><img src={avatar.alterEgo[ego].image}  height="100" width="100" alt={avatar.alterEgo[ego].name}/></div>
                <p>{player.name}</p>
                {template}
            </div>
        );
    }

    getTemplate(type) {
        const player = this.props.player;
        let template = null;


        switch(type) {
            case "preview":
                template = <p><b>{player.characterLevel}</b></p>
                break;

            case "full-view":
                template = (
                    <div className="level--wrap">
                        <LevelCounter player={player} levelName="characterLevel" />
                        <LevelCounter player={player} levelName="gearLevel" />
                        <h3>CombatLevel</h3>
                        <p><b>{player.combatLevel}</b></p>
                    </div>
                )
                break;
        }

        return template;

    }

    getAvatar() {
        return avatarList.find((avatar) => {
            return avatar.id === this.props.player.avatar.characterID;
        });
    }
}

export default Player;
