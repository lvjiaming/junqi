/**
 * Created by Administrator on 2018/12/13.
 * 准备js
 */
const gameServer = require("./gameServer");
webSocket = require("ws");
const fs = require("fs");
// console.log(fs);
function read() {
    fs.readFile("./config/serverConfig.json", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataStr = data.toString();
            const datas = JSON.parse(dataStr);
            console.log(datas);
        }
    });
};
read();