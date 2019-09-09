cc.Class({
    extends: cc.Component,

    properties: {
        stateNode: {
            default: null,
            type: cc.Node,
            tooltip: "状态的节点",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.RegisterEvent();
    },

    start () {

    },
    onDestroy() {
        this.unRegisterEvent();
    },

    /**
     *  注册事件
     * @constructor
     */
    RegisterEvent() {
        this.node.on(cc.lzqCusEvent.PLAYER_EVENT.STATE_CHANGE, this.stateChange, this);
        this.node.on(cc.lzqCusEvent.PLAYER_EVENT.GAME_START, this.gameStart, this);
        this.node.on(cc.hallCusEvent.PLAYER.INIT_PLAYER, this.initPlayer, this);
    },

    /**
     *  反注册事件
     */
    unRegisterEvent() {
        this.node.off(cc.lzqCusEvent.PLAYER_EVENT.STATE_CHANGE, this.stateChange, this);
        this.node.off(cc.lzqCusEvent.PLAYER_EVENT.GAME_START, this.gameStart, this);
        this.node.off(cc.hallCusEvent.PLAYER.INIT_PLAYER, this.initPlayer, this);
    },

    initPlayer() {
        this.setStateNodeState(false);
    },

    /**
     *  设置状态节点的状态
     */
    setStateNodeState(state) {
        if (this.stateNode) {
            this.stateNode.active = state;
        }
    },

    /**
     *  状态变化
     */
    stateChange(data) {
        this.setStateNodeState(true);
        let str = "";
        switch (data) {
            case cc.commonCfg.USER_STATE.READY: {
                str = "已准备";
                break;
            }
            case cc.commonCfg.USER_STATE.NO_READY: {
                str = "未准备";
                break;
            }
            case cc.commonCfg.USER_STATE.NONE: {
                str = "未准备";
                break;
            }
            case cc.commonCfg.USER_STATE.OFF_LINE: {
                str = "已离线";
                break;
            }
            case -1: {
                str = "无人";
                break;
            }
        }
        if (this.stateNode) {
            this.stateNode.getComponent(cc.Label).string = str;
        }
    },

    /**
     *  游戏开始
     */
    gameStart() {
        this.setStateNodeState(false);
    },

    // update (dt) {},
});
