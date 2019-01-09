/**
 * Created by Administrator on 2018/12/27.
 */
class MsgHandler {
    constructor(item) { // 构造函数
        this.ay = item;
    };
    get a () {
        return this.ay;
    };
    set b (c) {
        this.ay = c;
    };
}
MsgHandler.prototype.aaa = 1; // 会被继承
MsgHandler.prototype.action = false;
class GameMsgHandler extends MsgHandler { // 继承
    constructor(item) {
        super(item);
    };
};
const m = new MsgHandler(11);
const gm = new GameMsgHandler(22);
console.log(gm.action);
