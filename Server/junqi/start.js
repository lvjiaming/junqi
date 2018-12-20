/**
 * Created by Administrator on 2018/12/13.
 * 准备js
 */
const hallServer = require("./hallServer/hallServer");
gameServerMgr = require('./gameServer');
fs = require("fs");
userMgr = require("./common/userInfoMgr");
utils = require("./common/utils");
updataServerConfig = require("./common/updataServerConfig");
commonCfg = require("./config/common");
userMgr = require("./common/userInfoMgr");
roomMgr = require("./common/roomMgr");
serverConfig = null;

/**
 *  读取txt里的文件，用于更新serverConfig.json里的内容
 * @param serverData
 */
module.exports = Start = {
    start() {
        readJson(readText);
    },
    startHallServer() {
        startOpenServer();
    },
    closeHallServer() {
        if (this.hs) {
            this.hs.hs.close();
        }
    },
    restartHallServer() {
        if (this.hs) {
            this.hs.hs.close(() => {
                startOpenServer();
            })
        } else {
            startOpenServer();
        }
    },
    // start()
};
Start.start();
function readText(serverData) {
    fs.readFile("./config.txt", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            if (!serverData) {
                serverData = {};
            }
            if (!serverData.gameServer) {
                serverData.gameServer = {};
            }
            const dataStr = data.toString();
            const listStr = dataStr.split("\r\n");
            console.log("获取到开启服务器的列表\n", listStr);
            listStr.forEach((item) => {
                const dataList = item.split(",");
                const info = {};
                const gameid = parseInt(dataList[0]);
                info.ip = dataList[1];
                info.port = dataList[2];
                info.name = dataList[3];
                info.gameid = gameid;
                if (!serverData.gameServer[gameid] || (serverData.gameServer[gameid] && !serverData.gameServer[gameid].isopen)) {
                    info.isopen = false;
                    serverData.gameServer[gameid] = info;
                }
            });
            fs.writeFile("./config/serverConfig.json", JSON.stringify(serverData), (err) => {
                if (err) {
                    console.error("写入失败",err);
                } else {
                    readJson(startOpenServer);
                }
            });
        }
    });
}

// 读取服务器的配置
function readJson(cb) {
    fs.readFile("./config/serverConfig.json", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataStr = data.toString();
            const datas = JSON.parse(dataStr);
            serverConfig = datas;
            if (cb && cb instanceof Function) {
                cb(serverConfig);
            }
        }
    });
};

/**
 *  所有准备完成后，开启服务器
 */
function startOpenServer() {
    if (serverConfig) {
        Start.hs = new hallServer(serverConfig.hallServer);
        // gameServerMgr.startGameServer(1);
    }
}