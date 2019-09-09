
const lzqCfg = {
    GameNodeZindex: 10000,
};
cc.Class({
    extends: cc.DeskComOpt,

    properties: {
        bianJie: {
            default: null,
            type: cc.Graphics,
            tooltip: "边界的绘图"
        },

        gameNode: {
            default: null,
            type: cc.Node,
            tooltip: "游戏节点",
        },
    },


    onLoad () {
        this._super();
        this.initPlayerArr();
        cc.lzq.gameControl = new cc.lzq_gameControl(this);
        cc.lzq.gameControl.createMap();
        if (this.gameNode) {
            this.gameNode.zIndex = lzqCfg.GameNodeZindex;
        }
        // cc.lzq.gameControl.createChessBack();
        // cc.lzqEventM.startEvent(cc.lzqEvent.EVENT_GAME_LAYOUT, cc.lzq.gameControl.getGameLayout());
        // cc.log(cc.lzq.gameControl.getGameLayout());
    },
    start () {

    },

    /**
     *  初始化玩家数组
     */
    initPlayerArr() {
        if (this.gameNode) {
            for (let index = 1; index < 3; index++) {
                const player = this.gameNode.getChildByName(`Player${index}`);
                if (player) {
                    this._playerNodeArr.push(player);
                }
            }
        }
        this.bindPlayerEvent();
    },

    /**
     *  初始化房间
     */
    initRoom(data) {
        this._super(data);
        this._playerNodeArr.forEach((item) => {
            if (item.info) {
                item.playerEvent(cc.lzqCusEvent.PLAYER_EVENT.STATE_CHANGE, item.info.state);
            } else {
                item.playerEvent(cc.lzqCusEvent.PLAYER_EVENT.STATE_CHANGE, -1);
            }
        });
    },

    /**
     *  玩家状态变化
     */
    playerStateChange(data) {
        const user = this.getUserById(data.userid);
        if (user) {
            user.playerEvent(cc.lzqCusEvent.PLAYER_EVENT.STATE_CHANGE, data.state);
        }
    },

    start () {

    },

    // update (dt) {},
});
