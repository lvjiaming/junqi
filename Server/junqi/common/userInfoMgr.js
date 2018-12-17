/**
 * Created by Administrator on 2018/12/14.
 */
const fs = require("fs");
module.exports = userInfoMgr = {

};
/**
 *  增加一个玩家
 */
userInfoMgr.insertUser = (user, cb) => {
    fs.readFile("./common/userInfo.json", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataStr = data.toString();
            let dataObj = {};
            if (dataStr) {
                dataObj = JSON.parse(dataStr);
            }
            dataObj[user.id] = user;
            fs.writeFile("./common/userInfo.json", JSON.stringify(dataObj), (err) => {
                if (err) {
                    console.error("写入失败",err);
                } else {
                    console.log("写入成功");
                }
            });
            if (cb && cb instanceof Function) {
                cb(dataObj);
            }
        }
    });
};
/**
 *  移除一个玩家
 * @param user
 */
userInfoMgr.removeUser = (user, cb) => {
    fs.readFile("./common/userInfo.json", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataStr = data.toString();
            let dataObj = {};
            if (dataStr) {
                dataObj = JSON.parse(dataStr);
            }
            console.log(dataObj);
            for (let us in dataObj) {
                if (us && us == user) {
                    delete dataObj[us];
                }
            }
            fs.writeFile("./common/userInfo.json", JSON.stringify(dataObj), (err) => {
                if (err) {
                    console.error("写入失败",err);
                } else {
                    console.log("写入成功");
                }
            });
            if (cb && cb instanceof Function) {
                cb(dataObj);
            }
        }
    });
};
/**
 *  获取一个玩家
 * @param id
 */
userInfoMgr.getUserByName = (name, cb) => {
    fs.readFile("./common/userInfo.json", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataStr = data.toString();
            let dataObj = {};
            if (dataStr) {
                dataObj = JSON.parse(dataStr);
            }
            let getUser = null;
            for (let us in dataObj) {
                if (dataObj[us] && dataObj[us].name == name) {
                    getUser = dataObj[us];
                }
            }
            if (cb && cb instanceof Function) {
                cb(getUser);
            }
        }
    });
};
/**
 *  修改一个玩家
 * @param user
 */
userInfoMgr.changeUser = (user, cb) => {
    fs.readFile("./common/userInfo.json", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const dataStr = data.toString();
            let dataObj = {};
            if (dataStr) {
                dataObj = JSON.parse(dataStr);
            }
            for (let us in dataObj) {
                if (us && us == user.id) {
                    dataObj[us] = user;
                }
            }
            fs.writeFile("./common/userInfo.json", JSON.stringify(dataObj), (err) => {
                if (err) {
                    console.error("写入失败",err);
                } else {
                    console.log("写入成功");
                }
            });
            if (cb && cb instanceof Function) {
                cb(dataObj);
            }
        }
    });
};