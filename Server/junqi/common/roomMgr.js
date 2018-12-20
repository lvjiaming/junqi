/**
 * Created by Administrator on 2018/12/20.
 */
module.exports = roomMgr = {

};
roomMgr.addRoom = (user, cb) => {
    fs.readFile("./common/roomInfo.json", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataStr = data.toString();
            let dataObj = {};
            if (dataStr) {
                dataObj = JSON.parse(dataStr);
            }
            const userList = [];
            userList.push(user);
            const info = {hostId: user.id, userList: userList, roomId: utils.objectToArray(dataObj).length + 1, roomState: commonCfg.ROOM_STATE.WAIT};
            dataObj[utils.objectToArray(dataObj).length + 1] = info;
            fs.writeFile("./common/roomInfo.json", JSON.stringify(dataObj), (err) => {
                if (err) {
                    console.error("写入失败",err);
                } else {
                    console.log("写入成功");
                }
            });
            console.log("新增一个房间：", utils.objectToArray(dataObj).length);
            if (cb && cb instanceof Function) {
                cb(info);
            }
        }
    });
};
roomMgr.deleteRoom = (roomId, cb) => {
    fs.readFile("./common/roomInfo.json", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataStr = data.toString();
            let dataObj = {};
            if (dataStr) {
                dataObj = JSON.parse(dataStr);
            }
            if (dataObj[roomId]) {
                delete dataObj[roomId];
            }
            fs.writeFile("./common/roomInfo.json", JSON.stringify(dataObj), (err) => {
                if (err) {
                    console.error("写入失败",err);
                } else {
                    console.log("写入成功");
                }
            });
            console.log("删除一个房间：", utils.objectToArray(dataObj).length);
            if (cb && cb instanceof Function) {
                cb(dataObj);
            }
        }
    });
};
roomMgr.addUser = (user, cb) => {
    fs.readFile("./common/roomInfo.json", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataStr = data.toString();
            let dataObj = {};
            if (dataStr) {
                dataObj = JSON.parse(dataStr);
            }
            let room = {};
            let hasFind = false;
            for (let index in dataObj) {
                const userList = dataObj[index].userList;
                if (userList.length <= 1 && !hasFind) {
                    userList.push(user);
                    hasFind = true;
                    room = dataObj[index];
                }
            }
            if (hasFind) {
                fs.writeFile("./common/roomInfo.json", JSON.stringify(dataObj), (err) => {
                    if (err) {
                        console.error("写入失败",err);
                    } else {
                        console.log("写入成功");
                    }
                });
                console.log("在现有的房间添加一个玩家");
                if (cb && cb instanceof Function) {
                    cb(room);
                }
            } else {
                roomMgr.addRoom(user, cb);
            }
        }
    });
};
