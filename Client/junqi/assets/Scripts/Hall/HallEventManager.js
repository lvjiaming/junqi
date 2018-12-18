
const GameEventManager = require('../Event/GameEventManager.js');
const HallEventManager = cc.Class({
    extends: GameEventManager,
    statics: {
        getInstance() {
            if (!this.hallEventManager) {
                this.hallEventManager = new HallEventManager();
            }
            return this.hallEventManager;
        },
    },
    connectServer(hostStr, callBack) {
        cc.log(`hallEventManager connect`);
        this.connect(hostStr, callBack);
    },
    startEvent(event, data) {
        cc.log(`发送的协议id为：${event}`);
        this.sendMessage(event, data);
    },
    onMsg(msgId, msgData) {
        cc.log(`收到的协议id为：${msgId}`);
        this.notifyEvent(msgId, msgData);
    }
});
HallEventManager.Event = {
    EVENT_ERR_MSG_REP: 0, // 错误消息
    EVENT_REGISTER_REQ: 1,  // 注册的请求
    EVENT_REGISTER_REP: 2,  // 注册的回复

    EVENT_LOGIN_IN_REQ: 3,  // 登录的请求
    EVENT_LOGIN_IN_REP: 4,  // 登录的回复
};
cc.hallEvent = HallEventManager.Event;
cc.hallEventM = HallEventManager.getInstance();
