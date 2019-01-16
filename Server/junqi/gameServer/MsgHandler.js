/**
 * Created by Administrator on 2018/12/27.
 */
class MsgHandler {
    constructor(item) { // 构造函数
        this.ay = item;
    };
    a () {
        return this.ay;
    };
    b (c) {
        this.ay = c;
        console.log(222);
    };
}
MsgHandler.prototype.aaa = 1; // 会被继承
MsgHandler.prototype.action = false;
class GameMsgHandler extends MsgHandler { // 继承
    constructor(item) {
        super(item);
    };
    b () {
        console.log("333");
    };
};
const m = new MsgHandler(11);
const gm = new GameMsgHandler(22);
console.log(gm.b());
