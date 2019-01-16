/**
 * Created by Administrator on 2018/12/17.
 */
/**
 * Created by Administrator on 2018/12/13.
 */
const ws = require("ws");
const junQiMsgHandler = require("./junQiMsgHandler");
module.exports = junQiServer =  function (config) {
    if (config.isopen) {
        console.log(`this server has open(junQiServer)`);
        return;
    }
    console.log("start junQiServer");
    this.gameid = config.gameid;
    this.gameCfg = require("../common/lzqCfg");
    this.jqServer = new ws.Server({
        host: config.ip,
        port: config.port
    }, () => {
        config.isopen = true;
        updataServerConfig.updataServerConfig(config, () => {
            if (hallHander) {
                hallHander.returnGameList(true);
            }
        });
        this.jqHandler = new junQiMsgHandler(this);
        console.log(`server opened(junQiServer)`);
    });
    this.roomList = [];  // 该游戏的房间列表
    this.gameLayout = null; // 游戏的棋盘布局
    this.jqServer.on('connection', (ws) => {  //  注册连接上的事件
        console.log(`one client has connected(junQiServer)`);
        ws.on('message', (message) => {  //  接收客户端的消息
            console.log(`has get meesage(junQiServer): ${message}`);
            const msgObj = JSON.parse(message);
            this.jqHandler.handler(ws, msgObj);
        });
        ws.on('close', () => {

        });
    });
    this.jqServer.on('error', (err) => {
        config.isopen = false;
        updataServerConfig.updataServerConfig(config);
        console.log(`server has error(junQiServer): ${err}`);
    });
    this.jqServer.on('close', (ws) => {
        config.isopen = false;
        this.roomList = [];
        this.gameLayout = null;
        updataServerConfig.updataServerConfig(config, () => {
            if (hallHander) {
                hallHander.returnGameList(true);
            }
        });
        console.log(`server has close(junQiServer)`);
    });
    this.newRoom = (user) => {
        const newRoom = {};
        newRoom.userList = [];
        newRoom.userList.push(user);
        this.roomList.push(newRoom);
        return newRoom;
    };
};

