/**
 * Created by Administrator on 2018/12/13.
 */
const ws = require("ws");
const hallHanler = require("./hallMsgHandler");
module.exports = hallServer = function (config) {
    console.log("start hallServer");
    this.hs = new ws.Server({
        host: config.ip,
        port: config.port
    });
    // console.log(this.hs)
    this.hs.on('connection', (ws) => {  //  注册连接上的事件
        console.log(`one client has connected(hallServer)`);
        // userMgr.getUserByName("哈哈", (data) => {
        //     console.log(data);
        // });
        ws.on('message', (message) => {  //  接收客户端的消息
            console.log(`has get meesage(hallServer): ${message}`);
            const msgObj = JSON.parse(message);
            const handler = new hallHanler();
            handler.handler(ws, msgObj);
        });
        ws.on('close', () => {
            console.log(`one client has closed(hallServer)`);
        });
    });
    this.hs.on('error', (err) => {
        console.log(`server has error(hallServer): ${err}`);
    });
    this.hs.on('close', (ws) => {
        console.log(`server has close(hallServer)`);
    });
    this.hs.on('listening', () => {
        console.log(`server has listening(hallServer)`);
    });
};