const CommonCfg = {
    HALL_HOST: "ws://192.168.0.18:20001",
    GAME_ID: {
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
};
cc.commonCfg = CommonCfg;