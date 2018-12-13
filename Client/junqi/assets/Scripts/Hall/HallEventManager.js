
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
        switch (event) {
            case HallEventManager.Event.EVENT_LOGIN_REQ: {
                this.sendMessage(event, data);
                break;
            }
            case HallEventManager.Event.EVENT_ENTER_ROOM_REQ: {
                this.sendMessage(event, data);
                break;
            }
            case HallEventManager.Event.EVENT_LEAVE_ROOM_REQ: {
                this.sendMessage(event, data);
                break;
            }
            case HallEventManager.Event.EVENT_SEND_MEG_REQ: {
                this.sendMessage(event, data);
                break;
            }
            case HallEventManager.Event.EVENT_CREATE_ROOM_REQ: {
                this.sendMessage(event, data);
                break;
            }
            default: {
                break;
            }
        }
    },
    onMsg(msgId, msgData) {
        cc.log(`收到的协议id为：${msgId}`);
        switch (msgId) {
            case HallEventManager.Event.EVENT_LOGIN_REP: {
                // const msg = cc.dd.basePb.Login_rep.deserializeBinary(msgData);  //  反序列化数据
                cc.dd.UserData.setMsgData(msgData);
                break;
            }
            case HallEventManager.Event.EVENT_ENTER_ROOM_REP: {
                cc.dd.RoomData.enterRoom(msgData);
                break;
            }
            case HallEventManager.Event.EVENT_LEAVE_ROOM_REP: {
                this.notifyEvent(msgId, msgData);
                break;
            }
            case HallEventManager.Event.EVENT_SEND_MEG_REP: {
                this.notifyEvent(msgId, msgData);
                break;
            }
            case HallEventManager.Event.EVENT_CREATE_ROOM_REP: {
                cc.dd.RoomData.setMsg(msgData);
                break;
            }
            case HallEventManager.Event.EVENT_MESSAGE_PUSH: {
                this.notifyEvent(msgId, msgData);
                break;
            }
            case HallEventManager.Event.USER_ENTER_ROOM_PUSH: {
                cc.dd.RoomData.otherPlayerEnter(msgData);
                break;
            }
            case HallEventManager.Event.USER_LEAVE_ROOM_PUSH: {  //  玩家离开的推送
                cc.dd.RoomData.otherPlayerLeave(msgData);
                break;
            }
            default: {
                break;
            }
        }
    }
});
HallEventManager.Event = {
    EVENT_LOGIN_REQ: 1,
    EVENT_LOGIN_REP: 2,
    EVENT_ENTER_ROOM_REQ: 3,
    EVENT_ENTER_ROOM_REP: 4,
    EVENT_LEAVE_ROOM_REQ: 5,
    EVENT_LEAVE_ROOM_REP: 6,
    EVENT_SEND_MEG_REQ: 7,
    EVENT_SEND_MEG_REP: 8,
    EVENT_MESSAGE_PUSH: 9,  //  大厅服务器推送的消息
    EVENT_CREATE_ROOM_REQ: 10, //  创建房间
    EVENT_CREATE_ROOM_REP: 11, //  创建房间回复
    USER_ENTER_ROOM_PUSH: 12,  //  有玩家加入的推送
    USER_LEAVE_ROOM_PUSH: 13,  //  有玩家离开房间的推送
};
