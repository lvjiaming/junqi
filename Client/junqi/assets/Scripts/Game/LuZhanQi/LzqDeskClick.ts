const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {

    }

    /**
     *  返回点击事件
     */
    public onReturnClick(): void {
        cc.hallEventM.startEvent(cc.hallEvent.EVENT_QUIT_ROOM_REQ, {userid: cc.user.getUserId()});
    }

    /**
     *  准备点击事件
     */
    public onReadyClick(event: any): void {
        event.target.active = false;
    }

    // update (dt) {}
}
