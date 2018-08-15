import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlayerBadge from '../player/playerBadge';
import * as actionCreators from '../core/actions';
import CustomButton from '../button/index';
import { avatarList } from '../avatars';

class OverviewScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            originalXpos: null,
            originalYpos: null,
            itemLeft: 0,
            itemTop: 0,
            selectedID: null
        };

        this.isDragging = false;
        this.previousLeft = 0;
        this.previousTop = 0;

        this.updateHandler = this.updateHandler.bind(this);

        this.onDown = this.onDown.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onUp = this.onUp.bind(this);
    }


    elementsFromPoint(x, y) {
        let parents = [];
        let parent = void 0;
        do {
            if (parent !== document.elementFromPoint(x, y)) {
                parent = document.elementFromPoint(x, y);
                parents.push(parent);
                parent.style.pointerEvents = 'none';
            } else {
                parent = false;
            }
        } while (parent);
        parents.forEach(function (parent) {
            return parent.style.pointerEvents = 'all';
        });

        return parents;
    }

    /**
    *   temporarly saves the original xPos & yPos of the playerBadge
    *   that is being dragged
    */
    updateOriginalPos(xPos, yPos, reset = false) {
        if(this.state.originalXpos === null) {
            this.setState({
                originalXpos: xPos,
                originalYpos: yPos,
                itemLeft: xPos,
                itemTop: yPos
            });
        } else if(reset) {
            this.setState({
                originalXpos: null,
                originalYpos: null,
                itemLeft: null,
                itemTop: null
            })
        }
    }

    /**
    *   triggers a game update, such as load a new active player and set the next
    */
    updateHandler(e) {
        e.preventDefault();
        this.props.actions.updateGame();
        this.props.actions.updateView("turns");
    }

    /**
    *   onDown collects data from the playerBadge the pointer device is pointing
    *   down to. And isDragging will be set to TRUE.
    */
    onDown(e) {
        e.preventDefault();
        const rect = e.nativeEvent.target.getBoundingClientRect();
        this.updateOriginalPos(rect.x, rect.y);

        this.setState({
            selectedID: e.nativeEvent.target.dataset.id
        });

        this.isDragging = true;
    };

    /**
    *   onMove will update the X and Y pos of the playerBadge you're dragging to
    *   a new position
    */
    onMove(e) {
        e.preventDefault();
        if (!this.isDragging) {
            return;
        }
        const {left, top} = this.extractPositionDelta(e);



        this.setState(({itemLeft, itemTop}) => ({
            itemLeft: left,
            itemTop: top,
        }));
    };

    /**
    *   onUp will stop dragging the playerBadge and check if it was dropped on
    *   a slot and only then will it trigger the action to update the player order
    */
    onUp(e) {
        this.isDragging = false

        const matchingSlot = this.checkForMatchingSlots(e);

        if(matchingSlot.length > 0) {
            const newIndex = matchingSlot[0].dataset.slotid;
            this.props.actions.updatePlayerOrder(this.state.selectedID, newIndex);
        }

        this.setState(({itemLeft, itemTop}) => ({
            itemLeft: this.originalXpos,
            itemTop: this.originalYpos,
            selectedID: null
        }));

        this.updateOriginalPos(null, null, true);
    };

    /**
    *   With elementsFromPoint we pick up an array of DOMobjects that
    *   are positioned on the location of our cursor/pointer device
    */
    checkForMatchingSlots(e) {
        const xPos = e.clientX;
        const yPos = e.clientY;

        if (!document.elementsFromPoint) {
            document.elementsFromPoint = this.elementsFromPoint;
        }

        const DOMList = document.elementsFromPoint(xPos, yPos);

        return DOMList.filter((item) => {
            return item.classList.contains("player_slot");
        });
    }

    /**
    *   this will extract the position of our pointer device
    */
    extractPositionDelta(e) {
        const rect = e.nativeEvent.target.getBoundingClientRect();

        return {
            left: e.pageX - rect.width/2,
            top: e.pageY- rect.height/2
        };
    };

    /**
    *   returns the entire avatar object based on the id
    */
    getAvatar(player) {
        return avatarList.find((avatar) => {
            return avatar.id === player.avatar.characterID;
        });
    }

    /**
    *   this function will create a playerList with all the playerBadges
    *   and wrap them into slots
    */
    createPlayerList() {
        return this.props.playerList.map((player, index) => {
            let styling = null;
            const activeClass = this.isDragging ? "player_slot--active" : "";

            if(this.state.selectedID === player.id) {
                styling = {
                    cursor: 'move',
                    top: this.state.itemTop,
                    left: this.state.itemLeft,
                    zIndex: 100,
                    opacity: 0.5
                }
            }

            return (
                <div className={"player_slot " + activeClass } data-slotid={index}
                    key={player.id}>
                    <PlayerBadge player={player}
                        key={player.id}
                        onDown={this.onDown}
                        isDragging={this.isDragging}
                        styling={styling}
                        />
                </div>
            )
        });

    }


    render() {
        const LIST = this.createPlayerList();

        return (
            <div className="overviewScreen view_wrap layout-overview_view">
                <div onPointerMove={this.onMove}
                    onPointerUp={this.onUp}
                    touch-action="none"
                    style={{
                        height: "calc(100vh - 10px - 30px)",
                        userSelect: "none"
                    }}>
                    <div className="playerList" >
                        {LIST}
                    </div>
                </div>
                <div className="button__wrap">
                    <CustomButton
                        button_class="button--primary"
                        button_handler={this.updateHandler}
                        button_text="start playing!">
                    </CustomButton>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        playerList: state.app.gameSession.playerList
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewScreen);
