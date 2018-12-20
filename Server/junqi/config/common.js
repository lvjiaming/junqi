/**
 * Created by Administrator on 2018/12/13.
 */
module.exports = Common = {
    GameID: {
        GAME_JUNQI: 1,
        GAME2: 2,
        GAME3: 3,
    },
    MSG_CODE: {
        ERR: 1, // 错误消息
        SUC: 2, // 成功消息
    },
    EventId: {
        EVENT_ERR_MSG_REP: 0,   // 错误消息

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
    },
};
