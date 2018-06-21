import React from 'react';
import { avatarList } from '../avatars';
import { debugTools } from '../../debugTools';

import LevelCounter from '../levelCounter';


const Player = (props) => {

    /**
    *   returns the template based on the type that has been passed
    */
    const GET_TEMPLATE = (type) => {
        const PLAYER = props.player;
        let template = null;

        switch(type) {
            case "preview":
                template = <p><b>{PLAYER.characterLevel}</b></p>
                break;

            case "full-view":
                template = (
                    <div className="level--wrap">
                        <LevelCounter player={PLAYER} levelName="characterLevel" />
                        <LevelCounter player={PLAYER} levelName="gearLevel" />
                        <h3>CombatLevel</h3>
                        <p><b>{PLAYER.combatLevel}</b></p>
                    </div>
                )
                break;

            default:
                debugTools.log("unrecognized player template");
        }

        return template;

    }

    /**
    *   returns the entire avatar object based on the id
    */
    const GET_AVATAR = () => {
        return avatarList.find((avatar) => {
            return avatar.id === props.player.avatar.characterID;
        });
    }


    const CURRENT_PLAYER = props.player;
    const EGO = CURRENT_PLAYER.avatar.alterEgoState;
    const AVATAR = GET_AVATAR();
    const TEMPLATE = GET_TEMPLATE(props.type);

    return (
        <div className="player" onClick={props.clickHandler}
            data-id={CURRENT_PLAYER.id}>
            <div><img src={AVATAR.alterEgo[EGO].image}
                height="100" width="100" alt={AVATAR.alterEgo[EGO].name}/></div>
            <p>{CURRENT_PLAYER.name}</p>
            {TEMPLATE}
        </div>
    );
}


export default Player;
