

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.comTip.init();
        cc.resLoad.loadDirRes("dirRes/Common", () => {
            cc.comTip.show("连接服务器中");
            cc.loginEventM.connect("ws://192.168.0.18:20001", () => {
                cc.log("已连接");
                cc.comTip.hide();
            });
        });
    },

    start () {

    },

    // update (dt) {},
});
