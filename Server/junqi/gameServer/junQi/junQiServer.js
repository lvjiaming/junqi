/**
 * Created by Administrator on 2018/12/17.
 */
/**
 * Created by Administrator on 2018/12/13.
 */
const ws = require("ws");
module.exports = junQiServer =  function (config) {
    if (config.isopen) {
        console.log(`this server has open(junQiServer)`);
        return;
    }
    console.log("start junQiServer");
    this.jqServer = new ws.Server({
        host: config.ip,
        port: config.port
    }, () => {
        config.isopen = true;
        updataServerConfig.updataServerConfig(config);
        console.log(`server opened(junQiServer)`);
    });
    this.jqServer.on('connection', (ws) => {  //  注册连接上的事件
        console.log(`one client has connected(junQiServer)`);
        ws.on('message', (message) => {  //  接收客户端的消息
            console.log(`has get meesage(junQiServer): ${message}`);
            const msgObj = JSON.parse(message);
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
        updataServerConfig.updataServerConfig(config);
        console.log(`server has close(junQiServer)`);
    });
};

