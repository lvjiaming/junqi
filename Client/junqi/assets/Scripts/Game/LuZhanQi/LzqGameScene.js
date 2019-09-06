
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
     *  玩家绑定信息
     */
    playerNodeBindInfo(info) {
        if (info.userid == cc.user.getUserId()) {
            this._playerNodeArr[0].info = info;
        } else {
            this._playerNodeArr[1].info = info;
        }
    },

    /**
     *  初始化房间
     */
    initRoom(data) {
        data.userList.forEach(() => {})
    },

    start () {

    },

    // update (dt) {},
});
