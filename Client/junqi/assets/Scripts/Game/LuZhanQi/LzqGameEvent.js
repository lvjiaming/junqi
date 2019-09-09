
cc.Class({
    extends: cc.Component,

    properties: {
        _gameScene: "LzqGameScene",
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
        cc.log("加载完成");
        cc.lzqEventM.setEventLockState(false);
        cc.hallEventM.setEventLockState(false);
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
                cc.lzq.room = new cc.lzqRoom(data);
                this.node.getComponent(this._gameScene).clearDesk();
                this.node.getComponent(this._gameScene).initRoom(data);
                break;
            }
            case cc.hallEvent.EVENT_SEND_GAME_INFO: { // 游戏信息
                cc.log("游戏信息：", data);
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
            case cc.hallEvent.EVENT_SET_USER_STATE: {
                cc.log("设置玩家信息：", data);
                this.node.getComponent(this._gameScene).playerStateChange(data);
                break;
            }
            case cc.lzqEvent.EVENT_GAME_START: {
                cc.log("游戏开始：", data);
                cc.comTip.show("开发未完成，开始个屁啊", 5);
                break;
            }
        }
    },

    // update (dt) {},
});
