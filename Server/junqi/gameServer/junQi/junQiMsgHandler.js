/**
 * Created by Administrator on 2018/12/26.
 */
const junqiMsgHandler = function (target) {
    this.target = target;
};
junqiMsgHandler.prototype.handler = function (ws, data) {
    switch (utils.getEventId(data.msgId, this.target.gameid)) {
        case this.target.gameCfg.EVENT.EVENT_GAME_LAYOUT: {
            // console.log(data.msgData);
            break;
        }
    }
};
junqiMsgHandler.prototype.startGame = function (room) {

};
module.exports = function (target) {
    if (!this.jqHandler) {
        this.jqHandler = new junqiMsgHandler(target);
    }
    return this.jqHandler;
};