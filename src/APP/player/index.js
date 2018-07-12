import React from 'react';
import { avatarList } from '../avatars';

import LevelCounter from '../levelCounter';


const Player = (props) => {

    const GET_CLASSNAME = (type) => {
        let className;

        switch(type) {

            case "preview":
                className = "player_badge";
                break;

            case "full-view":
                className = "current_player"
                break;

            default:
                className = "";
        }

        return className;
    }

    /**
    *   returns the template based on the type that has been passed
    */
    const GET_TEMPLATE = (type) => {
        const CURRENT_PLAYER = props.player;
        const EGO = CURRENT_PLAYER.avatar.alterEgoState;
        const AVATAR = GET_AVATAR();
        const CLASSNAME = GET_CLASSNAME(type);

        switch(type) {

            case "preview":
            case "full-view":
                const template = type === "preview"
                    ? <p className="player_badge__level player_badge__text"><b>{CURRENT_PLAYER.characterLevel}</b></p>
                    : (<div className="level--wrap">
                            <LevelCounter player={CURRENT_PLAYER} levelName="characterLevel" />
                            <LevelCounter player={CURRENT_PLAYER} levelName="gearLevel" />
                            <h3 className="current_player__combat_level_label">CombatLevel</h3>
                            <p className="current_player__combat_level level">{CURRENT_PLAYER.combatLevel}</p>
                        </div>)

                return (
                    <React.Fragment>
                        <img className="stone_slab mobile_slab"
                            alt="stone slab"
                            src="assets/images/stone_slab_80.svg" />
                        <img className="stone_slab desktop_slab"
                            alt="stone slab"
                            src="assets/images/stone_slab_300.svg" />
                        <div>
                            <img src={AVATAR.alterEgo[EGO].image}
                                className={CLASSNAME + "__avatar"}
                                height="100"
                                width="100"
                                alt={AVATAR.alterEgo[EGO].name}/>
                        </div>
                        <p className={CLASSNAME + "__name"}>{CURRENT_PLAYER.name}</p>
                        {template}
                    </React.Fragment>
                )

            default:
                return (
                    <React.Fragment>
                        <div><img className="player__avatar"
                        src={AVATAR.alterEgo[EGO].image}
                        height="100" width="100"
                        alt={AVATAR.alterEgo[EGO].name}/></div>
                        <p>{CURRENT_PLAYER.name}</p>
                    </React.Fragment>)
        }
    }

    /**
    *   returns the entire avatar object based on the id
    */
    const GET_AVATAR = () => {
        return avatarList.find((avatar) => {
            return avatar.id === props.player.avatar.characterID;
        });
    }

    const CLASS = GET_CLASSNAME(props.type);
    const TEMPLATE = GET_TEMPLATE(props.type);

    return (
        <div className={"player " + CLASS } onClick={props.clickHandler}
            data-id={props.player.id}>
            {TEMPLATE}
        </div>
    );
}


export default Player;
