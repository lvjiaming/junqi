
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        cc.comTip.init(this.node);
        cc.hallEventM.addObserver(this);
        cc.lzqEventM.addObserver(this);
    },
    onDestroy() {
        cc.hallEventM.removeObserver(this);
        cc.lzqEventM.removeObserver(this);
    },
    start () {

    },
    onEventMessage(event, data) {
        switch (event) {
            case cc.hallEvent.EVENT_SEND_ROOM_INFO: { // 房间信息
                break;
            }
            case cc.hallEvent.EVENT_SEND_GAME_INFO: { // 游戏信息
                break;
            }
            case cc.hallEvent.EVENT_USER_ENTER_ROOM: {  // 玩家加入房间
                break;
            }
        }
    },

    // update (dt) {},
});
