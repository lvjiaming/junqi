/**
 * Created by Administrator on 2018/12/17.
 */
const common = require('./config/common');
module.exports = {
    _gameServerList: [],
    startGameServer(gameid) {
        console.log(`开始gameid = ${parseInt(gameid)}(${serverConfig.gameServer[gameid].name})的游戏`);
        if (serverConfig && serverConfig.gameServer && serverConfig.gameServer[gameid]) {
            switch (gameid) {
                case common.GameID.GAME_JUNQI: {
                    const info = {gameid: gameid};
                    const junqiServer = require('./gameServer/junQi/junQiServer');
                    info.server = new junqiServer(serverConfig.gameServer[gameid]);
                    this._gameServerList.push(info);
                    break;
                }
                default: {
                    console.log(`not write`);
                    break;
                }
            }
        }
    },
    closeGameServer(gameid) {
        this._gameServerList.forEach((item, index) => {
            if (item.gameid && item.gameid == gameid) {
                item.server.jqServer.close();
                this._gameServerList.splice(index, 1);
            }
        });
    },
    restartGameServer(gameid) {
        this._gameServerList.forEach((item, index) => {
            if (item.gameid && item.gameid == gameid) {
                item.server.jqServer.close(() => {
                    this.startGameServer(gameid);
                });
                this._gameServerList.splice(index, 1);
            }
        });
    },
    /**
     *  通过游戏id获取游戏服务器（id不传，默认将左右游戏服务器返回）
     */
    getGameServerByGameId(id) {
        let server = null;
        this._gameServerList.forEach((item) => {
            if (item.gameid == id) {
                server = item.server;
            }
        });
        if (!id) {
            server = this._gameServerList;
        }
        return server;
    },
    /**
     *  获取所有游戏服务的配置
     */
    getAllGameServerCfg(cb) {
        fs.readFile("./config/serverConfig.json", (err, data) => {
            if (err) {
                cc.log("获取游戏配置失败");
                console.error(err);
            } else {
                const dataStr = data.toString();
                const datas = JSON.parse(dataStr);
                const gameList = [];
                if (datas.gameServer) {
                    for (let index in datas.gameServer) {
                        if (datas.gameServer[index].isopen) {
                            gameList.push(datas.gameServer[index]);
                        }
                    }
                }
                if (cb && cb instanceof Function) {
                    cb(gameList);
                }
            }
        });
    },
};