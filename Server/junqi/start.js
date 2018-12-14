/**
 * Created by Administrator on 2018/12/13.
 * 准备js
 */
const hallServer = require("./hallServer/hallServer");
const gameServer = require("./gameServer/gameServer");
const fs = require("fs");

serverConfig = null;

/**
 *  读取txt里的文件，用于更新serverConfig.json里的内容
 * @param serverData
 */
function readText(serverData) {
    fs.readFile("./config.txt", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            if (!serverData) {
                serverData = {};
            }
            serverData.gameServer = {};
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
                serverData.gameServer[gameid] = info;
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
readJson(readText);

/**
 *  所有准备完成后，开启服务器
 */
function startOpenServer() {
    if (serverConfig) {
        const hs = new hallServer(serverConfig.hallServer);
        const gs = new gameServer(serverConfig.gameServer);
    }
}