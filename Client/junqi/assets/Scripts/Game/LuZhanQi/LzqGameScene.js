

cc.Class({
    extends: cc.Component,

    properties: {
        bianJie: {
            default: null,
            type: cc.Graphics,
            tooltip: "边界的绘图"
        },
    },


    onLoad () {
        cc.lzq.gameControl = new cc.lzq_gameControl(this);
        cc.lzq.gameControl.createMap();
        cc.lzq.gameControl.createChessBack();
        cc.lzqEventM.startEvent(cc.lzqEvent.EVENT_GAME_LAYOUT, cc.lzq.gameControl.getGameLayout());
        cc.log(cc.lzq.gameControl.getGameLayout());
    },

    start () {

    },

    // update (dt) {},
});
