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
    },
};
