

cc.Class({
    extends: cc.Component,

    properties: {
        loginNode: {
            default: null,
            type: cc.Node,
            tooltip: "登录节点"
        },
        registerNode: {
            default: null,
            type: cc.Node,
            tooltip: "注册节点"
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.comTip.init();
        cc.resLoad.loadDirRes("dirRes/Common", () => {
            cc.comTip.show("连接服务器中");
            cc.loginEventM.connect("ws://192.168.0.18:20001", () => {
                cc.log("已连接");
                cc.comTip.hide();
                this.isShowLogin(true);
            });
        });
    },

    start () {

    },
    /**
     *  是否显示登录界面
     * @param state
     */
    isShowLogin(state) {
        if (state) {
            if (this.loginNode) {
                this.loginNode.active = true;
                this.initLogin();
            }
            if (this.registerNode) {
                this.registerNode.active = false;
            }
        } else {
            if (this.loginNode) {
                this.loginNode.active = false;
            }
            if (this.registerNode) {
                this.registerNode.active = true;
                this.initRegister();
            }
        }
    },
    /**
     *  初始化登录界面
     */
    initLogin() {
        if (this.loginNode) {
            const name = this.loginNode.getChildByName("name");
            const pw = this.loginNode.getChildByName("password");
            if (name) {
                name.getComponent(cc.EditBox).string = "";
            }
            if (pw) {
                pw.getComponent(cc.EditBox).string = "";
            }
        }
    },
    /**
     *  初始化注册界面
     */
    initRegister() {
        if (this.registerNode) {
            const name = this.registerNode.getChildByName("name");
            const pw1 = this.registerNode.getChildByName("password");
            const pw2 = this.registerNode.getChildByName("password2");
            if (name) {
                name.getComponent(cc.EditBox).string = "";
            }
            if (pw1) {
                pw1.getComponent(cc.EditBox).string = "";
            }
            if (pw2) {
                pw2.getComponent(cc.EditBox).string = "";
            }
        }
    },
    /**
     *  登录
     */
    onLoginClick() {
        cc.log("登录");
    },
    /**
     *  注册
     */
    onRegisterClick() {
        cc.log("注册");
        let isSame = false;
        if (this.registerNode) {
            const pw1 = this.registerNode.getChildByName("password");
            const pw2 = this.registerNode.getChildByName("password2");
            if (pw1.getComponent(cc.EditBox).string == pw2.getComponent(cc.EditBox).string) {
                isSame = true;
            }
        }
        if (!isSame) {
            cc.comTip.show("请出入正确的信息", 2);
            return;
        }
    },
    /**
     *  打开注册界面
     */
    onOpenRegisterClick() {
        this.isShowLogin(false);
    },
    /**
     *  打开登录界面
     */
    onOpenLoginClick() {
        this.isShowLogin(true);
    },

    // update (dt) {},
});
