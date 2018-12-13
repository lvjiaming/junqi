

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.loginEventM.connect("ws://192.168.0.18:20001", () => {
            cc.log("已连接")
        });
    },

    start () {

    },

    // update (dt) {},
});
