/**
 * Created by Administrator on 2018/12/14.
 */
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
        console.log("输入为空");
        return false;
    }else if(!reg.test(obj)){ //正则验证不通过，格式不对
        console.log("格式不对");
        return false;
    }else{
        console.log("验证通过");
        return true;
    }
};
utils.checkPhone = (str) => {
    let reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (str === "") {
        console.log("输入为空");
        return false;
    }
    else if(!reg.test(str)){ //正则验证不通过，格式不对
        console.log("格式不对");
        return false;
    }else{
        console.log("验证通过");
        return true;
    }
};