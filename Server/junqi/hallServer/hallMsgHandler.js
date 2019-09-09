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
            this.returnGameList(ws, false, data.msgData);
            break;
        }
        case commonCfg.EventId.EVENT_ENTER_ROOM_SEQ: {
            console.log("请求进入房间");
            this.userEnterRoom(ws, data.msgData);
            break;
        }
        case commonCfg.EventId.EVENT_QUIT_ROOM_REQ: {
            console.log("请求退出房间");
            this.quitRoom(ws, data.msgData);
            break;
        }
        case commonCfg.EventId.EVENT_READY_REQ: {
            console.log("准备");
            this.ready(ws, data.msgData);
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
                    if (user.online == true) {
                        utils.sendErrMsg(ws, "用户已登录，请勿重复登录！");
                        return;
                    }
                    user.online = true;
                    // user.ws = ws;
                    userMgr.changeUser(user, (userlist) => {
                        this.userList = userlist;
                    });
                    ws.sessionId = user.id;
                    this.target.push(ws);
                    console.log(`sessionList.length: ${this.target.length}`);
                    utils.sendMsg(ws, commonCfg.EventId.EVENT_LOGIN_IN_REP, user);

                    // 判断该玩家是否在游戏房间内，有，则将其拉回房间
                    const serverList = gameServerMgr.getGameServerByGameId();
                    serverList.forEach((item) => {
                        item.server.roomList.forEach((room) => {
                            room.userList.forEach((users) => {
                                if (users.id == user.id) {
                                    console.log("该玩家有房间", serverList);
                                    setTimeout(() => {
                                        users.ws = ws;
                                        // todo 断线情况，游戏列表存在未发送给客户端，在此放入serverList字段，通知客户端游戏服务器开启的配置
                                        gameServerMgr.getAllGameServerCfg((serverList) => {
                                            utils.sendMsg(ws, commonCfg.EventId.EVENT_CAN_ENTER_ROOM, {gameid: item.gameid,
                                                serverList: serverList,
                                            });
                                            utils.sendMsg(ws, commonCfg.EventId.EVENT_SEND_ROOM_INFO, {gameid: item.gameid,
                                                userlist: utils.userInfoChangeToGameUserInfo(room.userList),
                                            });
                                        });
                                    }, 800);
                                }
                            });
                        });
                    });
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
HallHandler.prototype.returnGameList = function (ws, isAll, data) {
    fs.readFile("./config/serverConfig.json", (err, data) => {
        if (err) {
            console.error(err);
            utils.sendErrMsg(ws, "获取游戏列表失败");
        } else {
            const dataStr = data.toString();
            const datas = JSON.parse(dataStr);
            const gameList = [];
            if (datas.gameServer) {
                for (let index in datas.gameServer) {
                    if (datas.gameServer[index].isopen) {
                        if (commonCfg.IsForm) {
                            datas.gameServer[index].ip = commonCfg.PublicNetIP;
                        }
                        gameList.push(datas.gameServer[index]);
                    }
                }
            }
            if (isAll) {
                this.target.forEach((item) => {
                    utils.sendMsg(item, commonCfg.EventId.EVENT_SEND_GAME_LIST, gameList);
                });
            } else {
                utils.sendMsg(ws, commonCfg.EventId.EVENT_SEND_GAME_LIST, gameList);
            }
        }
    });
};
HallHandler.prototype.userEnterRoom = function (ws, data) {
    userMgr.getUserByUserId(data.userid, (user) => {
        if (user) {
            console.log("找到用户");
            const serverList = gameServerMgr.getGameServerByGameId();
            let isInRoom = false;
            let inRoomId = 0;
            serverList.forEach((item) => {
                if (item.roomList) {
                    item.roomList.forEach((roomItem) => {
                        roomItem.userList.forEach((userItem) => {
                            if (userItem.id == user.id) {
                                isInRoom = true;
                                inRoomId = gameid;
                            }
                        });
                    });
                }
            });
            if (isInRoom) {
                cc.log("已在房间中，无法加入其它房间: ", inRoomId);
                utils.sendErrMsg(ws, `你已在${inRoomId}游戏房间中，无法加入其它房间`);
                return;
            }
            const server = gameServerMgr.getGameServerByGameId(data.gameid);
            console.log("找到的服务器：", server);
            console.log("房间列表: ", server.roomList);
            if (server) {
                user.ws = ws;
                let curRoom = null;
                if (server.roomList.length <= 0) {
                    curRoom = server.newRoom(user);
                } else {
                    let hasFind = false;
                    server.roomList.forEach((item) => {
                        if (item.userList.length < 2) {
                            item.userList.push(user);
                            curRoom = item;
                            hasFind = true;
                        }
                    });
                    if (!hasFind) {
                        curRoom = server.newRoom(user);
                    }
                }
                console.log(server.roomList);
                if (curRoom) {
                    curRoom.userList.forEach((item) => {
                        utils.sendMsg(ws, commonCfg.EventId.EVENT_CAN_ENTER_ROOM, {gameid: data.gameid});
                        if (item.id == data.userid) {
                            utils.sendMsg(item.ws, commonCfg.EventId.EVENT_SEND_ROOM_INFO, {gameid: data.gameid, userlist: utils.userInfoChangeToGameUserInfo(curRoom.userList)});
                        } else {
                            utils.sendMsg(item.ws, commonCfg.EventId.EVENT_USER_ENTER_ROOM, {userInfo: utils.userInfoChangeToGameUserInfo(item)});
                        }
                    });
                }
            } else {
                console.log("游戏服务器未开启：", data.gameid);
            }
        } else {
            utils.sendErrMsg(ws, "用户不存在");
        }
    })
};
/**
 *  退出房间
 * @param ws
 * @param data
 */
HallHandler.prototype.quitRoom = function (ws, data) {
    userMgr.getUserByUserId(data.userid, (user) => {
        if (user) {
            console.log("111");
            const serverList = gameServerMgr.getGameServerByGameId();
            let curRoomUser = [];
            console.log("服务器列表: ", serverList);
            serverList.forEach((item) => {
                console.log("服务器：", item.server.roomList);
                const roomList = item.server.roomList;
                if (roomList) {
                    for (let roomIndex = roomList.length - 1; roomIndex >= 0; roomIndex--) {
                        const userList = roomList[roomIndex].userList;
                        console.log("玩家列表：", userList);
                        console.log("申请玩家：", user);
                        for (let userIndex = userList.length - 1; userIndex >= 0; userIndex--) {
                            const userItem = userList[userIndex];
                            if (userItem.id == user.id) {
                                userList.forEach((userItems) => {
                                    curRoomUser.push(userItems);
                                });
                                userList.splice(userIndex, 1);
                                console.log("找到玩家，将玩家从此房间移除");
                                break;
                            }
                        }
                        if (userList.length == 0) {
                            console.log("此房间人数已为0，删除此房间");
                            roomList.splice(roomIndex, 1);
                            break;
                        }
                    }
                } else {
                    console.log("房间没有");
                }
            });
            console.log("找到的房间：", curRoomUser);
            if (curRoomUser) {
                curRoomUser.forEach((item) => {
                    if (item.id == user.id) {
                        utils.sendMsg(item.ws, commonCfg.EventId.EVENT_AGREE_QUIT_ROOM);
                    } else {
                        utils.sendMsg(item.ws, commonCfg.EventId.EVENT_USER_QUIT_ROOM, {userid: item.id});
                    }
                });
            } else {
                console.log("未找到房间");
            }
        } else {
            console.log("用户不存在");
        }
    });
};
/**
 *  准备
 * @param ws
 * @param data
 */
HallHandler.prototype.ready = function (ws, data) {
    userMgr.getUserByUserId(data.userid, (user) => {
        if (user) {
            console.log("找到用户");
            const inRoom = getRoomById(data.userid);
            if (inRoom) {
                const userInfo = getUserByIdInRoom(data.userid, inRoom);
                if (userInfo) {
                    userInfo.state = commonCfg.USER_STATE.READY;
                } else {
                    console.log("未在其房间找到该玩家！");
                }
                let canStart = false;
                if (inRoom.userList && inRoom.userList.length >= 2) {
                    let allReady = true;
                    inRoom.userList.forEach((item) => {
                        if (item.state != commonCfg.USER_STATE.READY) {
                            allReady = false;
                        }
                    });
                    if (allReady) {
                        canStart = true;
                    }
                }
                inRoom.userList.forEach((item) => {
                    utils.sendMsg(item.ws, commonCfg.EventId.EVENT_SET_USER_STATE, {userid: data.userid, state: commonCfg.USER_STATE.READY});
                });
                if (canStart) {
                    console.log("一切准备就绪，可以开始游戏了");
                    inRoom.onStateChange(commonCfg.ROOM_STATE.GAME);
                }

            } else {
                console.log("未找到房间！");
            }
        } else {
            console.log("用户不存在");
        }
    });
};

/**
 *  根据id找到其所属房间
 * @param id
 * @param cb
 * @returns {*}
 */
const getRoomById = function (id, cb) {
    const serverList = gameServerMgr.getGameServerByGameId();
    let finRoom = null;
    serverList.forEach((item) => {
        const roomList = item.server.roomList;
        if (roomList) {
            for (let index1 = 0; index1 < roomList.length; index1++) {
                const roomItem = roomList[index1];
                let hasFind = false;
                for (let index2 = 0; index2 < roomItem.userList.length; index2++) {
                    const userItem = roomItem.userList[index2];
                    if (userItem && userItem.id == id) {
                        hasFind = true;
                        break;
                    }
                }
                if (hasFind) {
                    finRoom = roomItem;
                    break;
                }
            }
        }
    });
    return finRoom;
};

/**
 *  根据id找到房间内对应的玩家
 */
const getUserByIdInRoom = function (id, room) {
    let userInfo = null;
    if (room) {
        const userList = room.userList;
        if (userList) {
            for (let index = 0; index < userList.length; index++) {
                if (userList[index].id == id) {
                    userInfo = userList[index];
                    break;
                }
            }
        } else {
            console.log("此房间为空房间（userList为空）");
        }
    } else {
        console.log("房间是空的！");
    }
    return userInfo;
};

module.exports = function (target, ws) {
    if (!this.hallHandle) {
        this.hallHandle = new HallHandler(target, ws);
    }
    return this.hallHandle;
};