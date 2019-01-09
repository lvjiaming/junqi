/**
 * Created by Administrator on 2018/12/13.
 */
const ws = require("ws");
const hallHanler = require("./hallMsgHandler");
hallHander = null;
module.exports = hallServer = function (config) {
    console.log("start hallServer");
    this.hs = new ws.Server({
        host: config.ip,
        port: config.port
    });
    this.sessionList = [];  // 记录在线玩家的session
    // utils.sendEmail("1914460238@qq.com", "军旗", "验证码：11232", (info) => {
    //     console.log("发送成功", info);
    // });
    // console.log(this.hs)
    this.hs.on('connection', (ws) => {  //  注册连接上的事件
        console.log(`one client has connected(hallServer)`);
        // userMgr.getUserByName("哈哈", (data) => {
        //     console.log(data);
        // });
        hallHander = new hallHanler(this.sessionList, ws);
        ws.on('message', (message) => {  //  接收客户端的消息
            console.log(`has get meesage(hallServer): ${message}`);
            const msgObj = JSON.parse(message);

            hallHander.handler(ws, msgObj);
        });
        ws.on('close', () => {
            userInfoMgr.getUserBySessionId(ws.sessionId, (user) => {
                if (user) {
                    user.online = false;
                    userInfoMgr.changeUser(user, (userlist) => {
                        hallHander.userList = userlist;
                    });
                }
            });
            this.sessionList.forEach((item, index) => {
                if (ws.sessionId == item.sessionId) {
                    this.sessionList.splice(index, 1);
                }
            });
            console.log(`sessionList.length: ${this.sessionList.length}`);
            console.log(`one client has closed(hallServer)`);
            // userMgr.get
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