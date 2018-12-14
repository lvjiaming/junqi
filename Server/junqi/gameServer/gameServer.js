/**
 * Created by Administrator on 2018/12/13.
 */
const ws = require("ws");
module.exports = gameServer =  function (config) {
    console.log("start gameServer");
    if (!this.gs) {
        this.gs = {};
    }
    for (let gameid in config) {
        console.log(`开启gameid = ${gameid}(${config[gameid].name})的服务器(${config[gameid].ip}:${config[gameid].port})`);
        this.gs[gameid] = new ws.Server({
            host: config[gameid].ip,
            port: config[gameid].port
        });
        this.gs[gameid].on('connection', (ws) => {  //  注册连接上的事件
            console.log(`one client has connected(gameServer)`);
            ws.on('message', (message) => {  //  接收客户端的消息
                console.log(`has get meesage(gameServer): ${message}`);
                const msgObj = JSON.parse(message);
            });
            ws.on('close', () => {

            });
        });
        this.gs[gameid].on('error', (err) => {
            console.log(`server has error(gameServer): ${err}`);
        });
        this.gs[gameid].on('close', (ws) => {
            console.log(`server has close(gameServer)`);
        });
    }
};

