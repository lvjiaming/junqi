/**
 * Created by Administrator on 2018/12/13.
 */
const ws = require("ws");
module.exports = hallServer = function (config) {
    console.log("start hallServer");
    this.hs = new ws.Server({
        host: config.ip,
        port: config.port
    });
};