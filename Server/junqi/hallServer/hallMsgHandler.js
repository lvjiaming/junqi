const WebSocket = require('ws');
const HallHandler = function (target, ws) {
    this.target = target;
    this.ws = ws;
};
HallHandler.prototype.handler = function(ws, data) {
    switch (data.msgId) {
        case commonCfg.EventId.EVENT_REGISTER_REQ: {
            console.log("玩家注册");
            this.addUser(ws, data.msgData);
            break;
        }
        case commonCfg.EventId.EVENT_LOGIN_IN_REQ: {
            console.log("玩家登录");
            this.login(ws, data.msgData);
            break;
        }
        case commonCfg.EventId.EVENT_GET_GAME_LIST_REQ: {
            console.log("请求游戏列表");
            this.returnGameList(data.msgData);
            break;
        }
        case commonCfg.EventId.EVENT_ENTER_ROOM_SEQ: {
            console.log("请求进入房间");
            this.userEnterRoom(ws, data.msgData);
            break;
        }
    }
};
/**
 *  添加玩家
 */
HallHandler.prototype.addUser = function(ws, data) {
    if (utils.checkEmail(data.name) || utils.checkPhone(data.name)) {
        userMgr.getUserByName(data.name, (user) => {
            if (user) {
                console.log("用户名已经被注册了");
                utils.sendErrMsg(ws, "用户名已经被注册了");
            } else {
                userMgr.getUserList((userList) => {
                    const getUserId = function () {
                        const userId = utils.getRandom(6);
                        let has = false;
                        utils.objectToArray(userList).forEach((item) => {
                            if (parseInt(item.id) == parseInt(userId)) {
                                has = true;
                            }
                        });
                        if (has) {
                            getUserId();
                        } else {
                            // ws.sessionId = userId;
                            const info = {id: userId, name: data.name, password: data.password};
                            userMgr.insertUser(info, (userlist) => {
                                this.userList =  userlist;
                            });
                            utils.sendMsg(ws, commonCfg.EventId.EVENT_REGISTER_REP, {});
                        }
                    };
                    getUserId();
                });
            }
        });
    } else {
        utils.sendErrMsg(ws, "用户名不符合规范");
    }
};
HallHandler.prototype.login = function (ws, data) {
    console.log(data.name);
    if (utils.checkEmail(data.name) || utils.checkPhone(data.name)) {
        userMgr.getUserByName(data.name, (user) => {
            if (user) {
                if (user.password == data.password) {
                    user.online = true;
                    userMgr.changeUser(user, (userlist) => {
                        this.userList = userlist;
                    });
                    ws.sessionId = user.id;
                    this.target.push(ws);
                    console.log(`sessionList.length: ${this.target.length}`);
                    utils.sendMsg(ws, commonCfg.EventId.EVENT_LOGIN_IN_REP, user);
                    // roomMgr.addUser(user, (info) => {
                    //     console.log("房间信息：", info);
                    // });
                } else {
                    utils.sendErrMsg(ws, "密码不正确！");
                }
            } else {
                utils.sendErrMsg(ws, "用户不存在！");
            }
        });
    } else {
        utils.sendErrMsg(ws, "请输入正确的用户名");
    }
};
HallHandler.prototype.returnGameList = function (data) {
    fs.readFile("./config/serverConfig.json", (err, data) => {
        if (err) {
            console.error(err);
            utils.sendErrMsg(this.ws, "获取游戏列表失败");
        } else {
            const dataStr = data.toString();
            const datas = JSON.parse(dataStr);
            const gameList = [];
            if (datas.gameServer) {
                for (let index in datas.gameServer) {
                    if (datas.gameServer[index].isopen) {
                        gameList.push(datas.gameServer[index]);
                    }
                }
            }
            utils.sendMsg(this.ws, commonCfg.EventId.EVENT_SEND_GAME_LIST, gameList);
        }
    });
};
HallHandler.prototype.userEnterRoom = function (ws, data) {
    userMgr.getUserByUserId(data.userid, (user) => {
        if (user) {
            console.log("找到用户");
            const server = gameServerMgr.getGameServerByGameId(data.gameid);
            if (server) {
                user.ws = ws;
                if (server.roomList.length <= 0) {
                    server.newRoom(user);
                } else {
                    server.roomList.forEach((item) => {
                        if (item.userList.length >= 2) {
                            server.newRoom(user);
                        } else {
                            item.userList.push(user);
                        }
                    });
                }
                console.log(server.roomList);
            } else {
                console.log("服务器为开启")
            }
        } else {
            utils.sendErrMsg(ws, "用户不存在");
        }
    })
};
module.exports = function (target, ws) {
    if (!this.hallHandle) {
        this.hallHandle = new HallHandler(target, ws);
    }
    return this.hallHandle;
};