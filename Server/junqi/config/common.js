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
    ROOM_STATE: {
        WAIT: 1,  // 等待状态
        GAME: 2,  // 游戏状态
        END: 3,  // 游戏结束状态
    },
    USER_STATE: {
        NONE: 0, // 无状态
        READY: 1, // 准备状态
        NO_READY: 2, // 未准备的状态
        OFF_LINE: 3, // 离线状态
    },

    IsForm: true,

    FormGameIP: "172.17.163.68",

    PublicNetIP: "59.110.221.90",

    // 数据库的配置
    DbConfig: {
        host: '59.110.221.90',         //地址
        user: 'root',              //用户名
        password: 'lvjiaming.!@3',              //密码
        database: 'mydb'         //要链接的数据库名字
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
        EVENT_USER_ENTER_ROOM: 11, // 玩家加入房间
        EVENT_USER_ONLINE_CHANGE: 12, // 玩家在线状态改变

        EVENT_READY_REQ: 13, // 准备的请求
        EVENT_SET_USER_STATE: 14, // 设置玩家的状态

        EVENT_QUIT_ROOM_REQ: 15, // 退出房间的请求
        EVENT_AGREE_QUIT_ROOM: 16, // 同意退出房间
        EVENT_USER_QUIT_ROOM: 17, // 玩家退出房间

        EVENT_CAN_ENTER_ROOM: 18, // 玩家可以进入房间（旨在将玩家放入房间，此时唯一通道）
    },
};
