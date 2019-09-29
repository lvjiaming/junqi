/**
 * Created by Administrator on 2019/9/27.
 * 数据库的操作
 */
const mysql = require("mysql");
const common = require("./config/common");
let connectPool = null;  // 连接池
module.exports = mySqlMgr = {
    connect: () => {  // 创建连接的缓冲池
        connectPool = mysql.createPool(common.DbConfig);
    },

    /**
     *  处理一个请求
     */
    dealWithQuery: (sqlStr, cb) => {
        console.log("处理的请求：", sqlStr);
        if (connectPool) {
            connectPool.getConnection((err, conn) => {
                if (err) {
                    console.log("获取连接失败: ", err);
                    if (cb && cb instanceof Function) {
                        cb();
                    }
                } else {
                    conn.query(sqlStr, (err, result) => {
                        if (err) {
                            console.log("查找失败: ", err);
                            if (cb && cb instanceof Function) {
                                cb();
                            }
                        } else {
                            if (cb && cb instanceof Function) {
                                cb(result);
                            }
                        }
                    });
                }
            });
        } else {
            console.log("连接池还未创建！");
            if (cb && cb instanceof Function) {
                cb();
            }
        }
    },

    /**
     *  插入玩家
     */
    insertUser: (userInfo, cb) => {
        const sqlStr = `insert into user(id, name, password, online) values(${userInfo.id}, '${userInfo.name}', 
        '${userInfo.password}', ${userInfo.online ? 1 : 0})`;
        mySqlMgr.dealWithQuery(sqlStr, (result) => {
            if (result) {
                console.log("插入成功！");
                if (cb && cb instanceof Function) {
                    cb(result);
                }
            }
        });
    },

    /**
     *  通过id删除玩家
     * @param id
     */
    delUserById: (id) => {
        const sqlStr = `delete from user where id = '${id}'`;
        mySqlMgr.dealWithQuery(sqlStr, (result) => {
            if (result) {
                console.log("删除成功！");
            }
        });
    },

    /**
     *  获取玩家，通过id
     * @param id
     * @param cb
     */
    getUserById: (id, cb) => {
        const sqlStr = `select * from user where id = '${id}'`;
        mySqlMgr.dealWithQuery(sqlStr, (result) => {
            if (result) {
                if (cb && cb instanceof Function) {
                    cb(result[0]);
                }
            }
        });
    },

    /**
     *  通过名字获取玩家
     * @param name
     * @param cb
     */
    getUserByName: (name, cb) => {
        const sqlStr = `select * from user where name = '${name}'`;
        mySqlMgr.dealWithQuery(sqlStr, (result) => {
            if (result) {
                // console.log("查找到的玩家！", result);
                if (cb && cb instanceof Function) {
                    cb(result[0]);
                }
            }
        });
    },

    /**
     *  修改玩家信息
     */
    updateUserInfo: (user, cb) => {
        const sqlStr = `update user set id = '${user.id}', name = '${user.name}', 
        password = '${user.password}', online = '${user.online ? 1 : 0}' where id = '${user.id}'`;
        mySqlMgr.dealWithQuery(sqlStr, (result) => {
            if (result) {
                if (cb && cb instanceof Function) {
                    cb(result);
                }
            }
        });
    },

    /**
     *  获取所有玩家
     */
    getAllUser: (cb) => {
        const sqlStr = `select * from user`;
        mySqlMgr.dealWithQuery(sqlStr, (result) => {
            if (result) {
                if (cb && cb instanceof Function) {
                    cb(result);
                }
            }
        });
    },

};
// mySqlMgr.connect();
// mySqlMgr.insertUser({id: 123457, name: "user1", password: "12334", online: 1});
// mySqlMgr.delUserById(123456);
// mySqlMgr.updateUserInfo({id: 123456, name: "user2", password: "12334", online: 0});
// mySqlMgr.getUserByName("user1", (userlist) => {
//     console.log("查询到:", userlist);
// });