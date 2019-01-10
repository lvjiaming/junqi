const GameCfg = {
    SEAT_TYPE: { // 座位的类型
        BING_ZHAN: 1, // 兵站
        XING_YING: 2, // 行营
        QIAN_XIAN: 3, // 前线
        DA_BEN_YING: 4, // 大本营
        SHAN_JIE: 5, // 山界
    },
    ITEM_TYPE: {
        SI_LING: 1, // 司令
        JUN_ZHANG: 2, // 军长
        SHI_ZHANG: 3, // 师长
        LV_ZHANG: 4, // 旅长
        TUAN_ZHANG: 5, // 团长
        YING_ZHANG: 6, // 营长
        LIAN_ZHANG: 7, // 连长
        PAI_ZHANG: 8, // 排长
        GONG_BING: 9, // 工兵
        ZHAN_DAN: 10, // 炸弹
        DI_LEI: 11, // 地雷
        JUN_QI: 12, // 军旗
    },
    CHESS_NAME: [
        "",
        "司令",
        "军长",
        "师长",
        "旅长",
        "团长",
        "营长",
        "连长",
        "排长",
        "工兵",
        "炸弹",
        "地雷",
        "军旗",
    ],
    MAT_SIZE: {  // 地图大小
        W: 650,
        H: 1100,
    },
    ITEM_SIZE: { // 棋子大小
        W: 50,
        H: 20,
        SPACE_X: 140,
        SPACE_Y: 80,
    },
    ITEM_LIST: { // 棋子分部（13行5列）
        X: 5,
        Y: 13,
    },
    CHESS_MIAN: { // 棋子的正反面
        BACK: 1, // 棋子背面
        FACE: 2, // 棋子正面
    },
    CHESS_SUIT: { // 棋子的花色
        RED: 1, // 红色方
        BLACK: 2, // 黑色方
    },
};
cc.lzqGameCfg = GameCfg;