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
};