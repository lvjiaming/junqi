

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
        this.gameControl = new cc.lzq_gameControl(this);
        this.gameControl.createMap();
    },

    start () {

    },

    // update (dt) {},
});
