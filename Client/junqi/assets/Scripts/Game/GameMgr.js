const GameMgr = cc.Class({
    statics: {
        getInstance() {
            if (!this.gmMgr) {
                this.gmMgr = new GameMgr();
            }
            return this.gmMgr;
        },
    },
    curConnect: null, // 当前的连接
    gameServerList: null, // 游戏列表

    /**
     *  更新游戏列表
     */
    updateSererList(list) {
        this.gameServerList = list;
    },

    /**
     *  获取游戏列表
     * @returns {null|Array}
     */
    getServerList() {
        return this.gameServerList || [];
    },

    /**
     *  根据游戏id获取游戏服务器
     */
    getServerById(id) {
        let cfg = null;
        this.getServerList().forEach((item) => {
            if (item.gameid == id) {
                cfg = item;
            }
        });
        return cfg;
    },

    /**
     *  连接游戏服务器
     * @param cfg
     */
    connect(cfg, cb) {
        const gameid = cfg.gameid;
        const ip = cfg.ip;
        const port = cfg.port;
        if (!gameid || !ip || !port) {
            cc.error(`cfg is error`);
        } else {
            const str = `ws://${ip}:${port}`;
            this.curConnect = str;
            switch (gameid) {
                case cc.commonCfg.GAME_ID.GAME_JUNQI: {
                    cc.lzqEventM.connect(str, cb);
                    break;
                }
            }
        }
    },
    /**
     *  根据gameId获取场景的名字
     * @param gameid
     */
    getSceneName(gameid) {
        let str = null;
        switch (gameid) {
            case cc.commonCfg.GAME_ID.GAME_JUNQI: {
                str = "LzqGameScene";
                break;
            }
        }
        return str;
    },

    /**
     *  跳转到游戏场景
     * @param gameid 游戏id
     * @param data 房间需要的数据
     * @param cb 跳转成功的回调
     */
    changeToGameScene(gameid, data, cb) {
        const change = () => {
            const sceneName = this.getSceneName(gameid);
            if (sceneName) {
                cc.director.preloadScene(sceneName, () => {
                    cc.comTip.hide();
                    switch (gameid) {
                        case cc.commonCfg.GAME_ID.GAME_JUNQI: {
                            cc.lzq = {};
                            cc.lzq.room = new cc.lzqRoom(data);
                            break;
                        }
                    }
                    cc.director.loadScene(sceneName);
                })
            }
        };
        if (this.curConnect) {
            change();
        } else {
            this.connect(this.getServerById(gameid), () => {
                change();
            });
        }

    },
});
cc.gameMgr = GameMgr.getInstance();