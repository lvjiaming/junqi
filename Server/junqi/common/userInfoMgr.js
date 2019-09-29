/**
 * Created by Administrator on 2018/12/14.
 */
const fs = require("fs");
const mysql = require("../mysql");
mysql.connect();
module.exports = userInfoMgr = {

};
/**
 *  增加一个玩家
 */
userInfoMgr.insertUser = (user, cb) => {
    mysql.insertUser(user, () => {
        mysql.getAllUser(cb);
    });
};
/**
 *  移除一个玩家
 * @param user
 */
userInfoMgr.removeUser = (user, cb) => {
    mysql.delUserById(user.id);
};
/**
 *  获取一个玩家
 * @param id
 */
userInfoMgr.getUserByName = (name, cb) => {
    mysql.getUserByName(name, cb);
};
/**
 *  通过sessionId获取用户
 * @param id
 * @param cb
 */
userInfoMgr.getUserBySessionId = (id, cb) => {
    mysql.getUserById(id, cb);
};
/**
 *  通过userId获取用户
 * @param id
 * @param cb
 */
userInfoMgr.getUserByUserId = (id, cb) => {
    mysql.getUserById(id, cb);
};
/**
 *  修改一个玩家
 * @param user
 */
userInfoMgr.changeUser = (user, cb) => {
    mysql.updateUserInfo(user, cb);
};
/**
 * 得到用户列表
 * @param cb
 */
userInfoMgr.getUserList = (cb) => {
    mysql.getAllUser(cb);
};