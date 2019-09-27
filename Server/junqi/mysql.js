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
    insertUser: (userInfo) => {
        const sqlStr = `insert into user(id, name, password, online) values(${userInfo.id}, '${userInfo.name}', '${userInfo.password}', ${userInfo.online})`;
        mySqlMgr.dealWithQuery(sqlStr, (result) => {
            if (result) {
                console.log("插入成功！");
            }
        });
    },

    delUserById: (id) => {
        const sqlStr = `delete from user where id = '${id}'`;
        mySqlMgr.dealWithQuery(sqlStr, (result) => {
            if (result) {
                console.log("删除成功！");
            }
        });
    }



};
mySqlMgr.connect();
// mySqlMgr.insertUser({id: 123456, name: "user2", password: "12334", online: 1});
mySqlMgr.delUserById(123456);