
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

    EVENT_GET_GAME_LIST_REQ: 5, // 请求游戏列表
    EVENT_SEND_GAME_LIST: 6,  // 发送游戏列表

    EVENT_ENTER_ROOM_SEQ: 7, // 进入房间请求
    EVENT_ENTER_ROOM_SEP: 8, // 进入房间回复
    EVENT_SEND_ROOM_INFO: 9, // 发送房间的信息
    EVENT_SEND_GAME_INFO: 10, // 发送游戏信息
    EVENT_USER_ENTER_ROOM: 11, // 玩家加入房间
    EVENT_USER_ONLINE_CHANGE: 12, // 玩家在线状态改变

    EVENT_READY_REQ: 13, // 准备的请求
    EVENT_SET_USER_STATE: 14, // 设置玩家的状态

    EVENT_QUIT_ROOM_REQ: 15, // 退出房间的请求
    EVENT_AGREE_QUIT_ROOM: 16, // 同意退出房间
    EVENT_USER_QUIT_ROOM: 17, // 玩家退出房间
};
/**
 *  公用的自定义事件
 * @type {{}}
 */
HallEventManager.CUSTOM_EVENT = {
    // a玩家的事件
    PLAYER: {
        INIT_PLAYER: "init_player", // 初始化玩家节点
    },
};
cc.hallEvent = HallEventManager.Event;
cc.hallEventM = HallEventManager.getInstance();
cc.hallCusEvent = HallEventManager.CUSTOM_EVENT;
