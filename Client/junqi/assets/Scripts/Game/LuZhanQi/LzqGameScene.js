
const lzqCfg = {
    ReadyBtnZindex: 10000,
};
cc.Class({
    extends: cc.Component,

    properties: {
        bianJie: {
            default: null,
            type: cc.Graphics,
            tooltip: "边界的绘图"
        },
        readyBtn:{
            default: null,
            type: cc.Node,
            tooltip: "准备的按钮",
        },
    },


    onLoad () {
        cc.lzq.gameControl = new cc.lzq_gameControl(this);
        cc.lzq.gameControl.createMap();
        if (this.readyBtn) {
            this.readyBtn.zIndex = lzqCfg.ReadyBtnZindex;
        }
        // cc.lzq.gameControl.createChessBack();
        // cc.lzqEventM.startEvent(cc.lzqEvent.EVENT_GAME_LAYOUT, cc.lzq.gameControl.getGameLayout());
        // cc.log(cc.lzq.gameControl.getGameLayout());
    },

    start () {

    },

    // update (dt) {},
});
