/**
 * Created by Administrator on 2018/12/26.
 */
const junqiMsgHandler = function (target) {
    this.target = target;
};
junqiMsgHandler.prototype.handler = function (ws, data) {
    switch (data.msgId) {
        case this.target.gameCfg.EVENT.EVENT_GAME_LAYOUT: {
            // console.log(data.msgData);
            break;
        }
    }
};
junqiMsgHandler.prototype.startGame = function (room) {
    room.userList.forEach((item) => {
        utils.sendMsg(item.ws, this.target.gameCfg.EVENT.EVENT_GAME_START);
    });
};
module.exports = function (target) {
    if (!this.jqHandler) {
        this.jqHandler = new junqiMsgHandler(target);
    }
    return this.jqHandler;
};