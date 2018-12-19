/**
 * Created by Administrator on 2018/12/14.
 */
const WebSocket = require('ws');
const email = require("nodemailer");
module.exports = utils = {

};
/**
 *  验证邮箱
 * @param str
 * @returns {boolean}
 */
utils.checkEmail = (str) => {
    // var temp = document.getElementById("text1");
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    let obj = str;
    if(obj === ""){ //输入不能为空
        console.log("输入为空(email)");
        return false;
    }else if(!reg.test(obj)){ //正则验证不通过，格式不对
        console.log("格式不对(email)");
        return false;
    }else{
        console.log("验证通过(email)");
        return true;
    }
};
utils.checkPhone = (str) => {
    let reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (str === "") {
        console.log("输入为空(phone)");
        return false;
    }
    else if(!reg.test(str)){ //正则验证不通过，格式不对
        console.log("格式不对(phone)");
        return false;
    }else{
        console.log("验证通过(phone)");
        return true;
    }
};
// utils.getMsgIdAndMsgData = (data) => {
//     if (typeof(data) == "string") {
//         data = JSON.parse(data);
//     }
//     return data.msgId, data.msgData;
// }
/**
 *  对象转换为数组
 */
utils.objectToArray = (data) => {
    const newData = [];
    for (let item in data) {
        newData.push(data[item]);
    }
    return newData;
};
utils.getRandom = (len) => {
    let str = '';
    for (let i = 0; i < len; i++) {
        if (i === 0) {
            str += Math.floor((Math.random() * 9) + 1);
        } else {
            str += Math.floor((Math.random() * 9) + 0);
        }
    }
    return str;
};
utils.sendMsg = (ws, msgId, data) => {
    if (ws.readyState === WebSocket.OPEN) {
        // data.code = commonCfg.MSG_CODE.SUC;
        ws.send(JSON.stringify({msgId: msgId, msgData: data}));
    }
};
utils.sendErrMsg = (ws, str) => {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({msgId: commonCfg.EventId.EVENT_ERR_MSG_REP, msgData: {msg: str, code: commonCfg.MSG_CODE.ERR}}));
    }
};
/**
 *  发送qq邮箱
 * @param user
 * @param title
 * @param text
 * @param cb
 */
utils.sendEmail = (user, title, text, cb) => {
    const transporter = email.createTransport({
        service: "qq",
        auth: {
            user: '863537291@qq.com',
            pass: 'xqmgqpjccxesbbec',
        },
    });
    const emailOpt = {
        from: '863537291@qq.com',
        to: user,
        subject: title,
        text: text,
    };
    transporter.sendMail(emailOpt, function (err, info) {
        if (err) {
            console.error(err);
        } else {
            if (cb && cb instanceof Function) {
                cb(info);
            }
        }
    });
};