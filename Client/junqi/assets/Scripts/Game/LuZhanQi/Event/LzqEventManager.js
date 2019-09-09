
const GameEventManager = require('../../../Event/GameEventManager.js');
const LzqEventManager = cc.Class({
    extends: GameEventManager,
    statics: {
        getInstance() {
            if (!this.lzqEventManager) {
                this.lzqEventManager = new LzqEventManager();
                this.lzqEventManager.setName("Lzq")
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
        // event = event + (1000 * cc.commonCfg.GAME_ID.GAME_JUNQI);
        this.sendMessage(event, data);
    },
    onMsg(msgId, msgData) {
        cc.log(`收到的协议id为：${msgId}`);
        this.notifyEvent(msgId, msgData);
    }
});
LzqEventManager.EVENT = {
    EVENT_GAME_LAYOUT: 1001,  // 游戏的布局（棋盘）
    EVENT_GAME_START: 1002, // 开始游戏
};
/**
 *  陆战棋的自定义事件
 * @type {{PLAYER_EVENT: {}}}
 */
LzqEventManager.CUSTOM_EVENT = {
    // 玩家的试剑
    PLAYER_EVENT: {
        STATE_CHANGE: "state_change", // 状态变化
        GAME_START: "game_start", // 游戏开始
    },
};
cc.lzqEvent = LzqEventManager.EVENT;
cc.lzqEventM = LzqEventManager.getInstance();
cc.lzqCusEvent = LzqEventManager.CUSTOM_EVENT;