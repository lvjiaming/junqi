/**
 * Created by Administrator on 2018/12/26.
 */
const junqiMsgHandler = function () {

};
junqiMsgHandler.prototype.handler = function (ws, data) {

};
module.exports = function (target) {
    if (!this.jqHandler) {
        this.jqHandler = new junqiMsgHandler(target);
    }
    return this.jqHandler;
};