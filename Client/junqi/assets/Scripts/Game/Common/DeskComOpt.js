const DeskComOpt = cc.Class({
    extends: cc.Component,

    properties: {
        readyBtn:{
            default: null,
            type: cc.Node,
            tooltip: "准备的按钮",
        },
        _playerNodeArr: [], // 玩家节点
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    /**
     *  绑定玩家事件
     */
    bindPlayerEvent() {
        this._playerNodeArr.forEach((item) => {
            item.playerEvent = (eventName, data) => {
                item.emit(eventName, data);
            };
        });
    },

    /**
     *  设置准备按钮的状态
     */
    setReadyNodeState(state) {
        if (this.readyBtn) {
            this.readyBtn.active = state;
        }
    },

    /**
     *  玩家绑定信息
     */
    playerNodeBindInfo(info) {
        if (info.id == cc.user.getUserId()) {
            this._playerNodeArr[0].info = info;
        } else {
            this._playerNodeArr[1].info = info;
        }
    },

    /**
     *  初始化房间
     */
    initRoom(data) {
        data.userlist.forEach((item) => {
            this.playerNodeBindInfo(item);
            if (item.id == cc.user.getUserId() && item.state == cc.commonCfg.USER_STATE.READY) {
                this.setReadyNodeState(false);
            }
        });
    },

    /**
     *  通过id获取玩家
     */
    getUserById(id) {
        let user = null;
        this._playerNodeArr.forEach((item) => {
            if (item.info && item.info.id == id) {
                user = item;
            }
        });
        return user;
    },

    /**
     * 清空桌面
     */
    clearDesk() {
        this._playerNodeArr.forEach((item) => {
            item.playerEvent(cc.hallCusEvent.PLAYER.INIT_PLAYER);
        });
    },

    // update (dt) {},
});
cc.DeskComOpt = DeskComOpt;
