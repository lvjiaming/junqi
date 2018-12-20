

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.comTip.init(this.node);
        cc.hallEventM.addObserver(this);
    },
    onDestroy() {
        cc.hallEventM.removeObserver(this);
    },
    start () {

    },
    onGetGameListClick() {
        cc.log("获取游戏列表");
        cc.hallEventM.startEvent(cc.hallEvent.EVENT_GET_GAME_LIST_REQ);
    },
    onEventMessage(event, data) {
        switch (event) {
            case cc.hallEvent.EVENT_ERR_MSG_REP: { // 错误信息
                cc.comTip.show(data.msg, 2);
                break;
            }
            case cc.hallEvent.EVENT_SEND_GAME_LIST: { // 游戏列表
                cc.log("获取到游戏列表", data);
                break;
            }
            case cc.hallEvent.EVENT_ENTER_ROOM_SEP: { // 进入房间回复
                cc.log("进入房间回复", data);
                break;
            }
            case cc.hallEvent.EVENT_SEND_ROOM_INFO: { // 发送房间信息
                cc.log("发送房间信息", data);
                break;
            }
        }
    },

    // update (dt) {},
});
