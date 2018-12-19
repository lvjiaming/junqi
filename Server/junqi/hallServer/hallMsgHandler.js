const WebSocket = require('ws');
const HallHandler = function (target) {
    this.target = target;
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
module.exports = function (target) {
    if (!this.hallHandle) {
        this.hallHandle = new HallHandler(target);
    }
    return this.hallHandle;
};