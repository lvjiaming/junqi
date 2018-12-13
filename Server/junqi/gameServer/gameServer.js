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
        console.log(`开启gameid = ${gameid}的服务器(${config[gameid].ip}:${config[gameid].port})`);
        this.gs[gameid] = new ws.Server({
            host: config[gameid].ip,
            port: config[gameid].port
        });
    }
};

