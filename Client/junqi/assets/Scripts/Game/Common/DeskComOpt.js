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

    start () {

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
    setReadyNodeState() {
        if (this.readyBtn) {
            this.readyBtn.active = state;
        }
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
