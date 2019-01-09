const GameMgr = cc.Class({
    statics: {
        getInstance() {
            if (!this.gmMgr) {
                this.gmMgr = new GameMgr();
            }
            return this.gmMgr;
        },
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
        const sceneName = this.getSceneName(gameid);
        if (sceneName) {
            cc.director.preloadScene(sceneName, () => {
                cc.comTip.hide();
                cc.director.loadScene(sceneName);
            })
        }
    },
});
cc.gameMgr = GameMgr.getInstance();