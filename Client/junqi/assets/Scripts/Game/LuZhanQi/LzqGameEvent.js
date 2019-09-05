
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        cc.comTip.init(this.node);
        cc.hallEventM.addObserver(this);
        cc.lzqEventM.addObserver(this);
        cc.lzqEventM.setListen(this);
    },
    onDestroy() {
        cc.hallEventM.removeObserver(this);
        cc.lzqEventM.removeObserver(this);
        cc.lzqEventM.removeListen();
    },
    start () {

    },
    /**
     *  重连失败的监听
     */
    reconnectFail() {
        cc.director.loadScene("HallScene");
    },
    /**
     *  重连成功的监听
     */
    reconnectSuc() {

    },
    onEventMessage(event, data) {
        switch (event) {
            case cc.hallEvent.EVENT_SEND_ROOM_INFO: { // 房间信息
                cc.log("房间信息：", data);
                break;
            }
            case cc.hallEvent.EVENT_SEND_GAME_INFO: { // 游戏信息
                break;
            }
            case cc.hallEvent.EVENT_USER_ENTER_ROOM: {  // 玩家加入房间
                cc.log("有玩家加入：", data);
                cc.lzq.room.addUser(data.userInfo);
                break;
            }
            case cc.hallEvent.EVENT_AGREE_QUIT_ROOM: {
                cc.log("同意退出房间");
                cc.lzqEventM.close();
                cc.director.loadScene("HallScene.fire");
                break;
            }
            case cc.hallEvent.EVENT_USER_QUIT_ROOM: {
                cc.log("玩家退出房间: ", data);
                break;
            }
        }
    },

    // update (dt) {},
});
