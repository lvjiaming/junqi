
const GameEventManager = require('../../../Event/GameEventManager.js');
const LzqEventManager = cc.Class({
    extends: GameEventManager,
    statics: {
        getInstance() {
            if (!this.lzqEventManager) {
                this.lzqEventManager = new LzqEventManager();
            }
            return this.lzqEventManager;
        },
    },
    connectServer(hostStr, callBack) {
        cc.log(`lzqEventManager connect`);
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
LzqEventManager.EVENT = {

};
cc.lzqEvent = LzqEventManager.EVENT;
cc.lzqEventM = LzqEventManager.getInstance();