import React, { Component } from 'react';
import { avatarList } from '../avatars';


class PlayerBadge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            xPos: 0,
            yPos: 0
        }
    }

    render() {
        const CURRENT_PLAYER = this.props.player;
        const EGO = CURRENT_PLAYER.avatar.alterEgoState;
        const AVATAR = this.getAvatar();

        const className = this.props.isDragging ? "player_badge--captured" : "";

        const styling = this.props.styling;

        return (
            <div className={"player player_badge " + className}
                data-id={CURRENT_PLAYER.id}
                onPointerDown={this.props.onDown}
                style={styling}
                touch-action="none"
                >
                <div className="innerWrap" style={{pointerEvents: "none"}}>
                    <img className="stone_slab mobile_slab"
                        alt="stone slab"
                        src="assets/images/stone_slab_80.svg" />
                    <img className="stone_slab desktop_slab"
                        alt="stone slab"
                        src="assets/images/stone_slab_300.svg" />
                    <div className="avatar__wrap">
                        <img src={AVATAR.alterEgo[EGO].image}
                            className={"player_badge__avatar"}
                            height="100"
                            width="100"
                            alt={AVATAR.alterEgo[EGO].name}/>
                    </div>
                    <p className={"player_badge__name"}>{CURRENT_PLAYER.name}</p>
                    <p className="player_badge__level player_badge__text"><b>{CURRENT_PLAYER.characterLevel}</b></p>
                </div>
            </div>
        )

    }

    /**
    *   returns the entire avatar object based on the id
    */
    getAvatar() {
        return avatarList.find((avatar) => {
            return avatar.id === this.props.player.avatar.characterID;
        });
    }

}

export default PlayerBadge;
