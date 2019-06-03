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

    }

    /**
     *  准备点击事件
     */
    public onReadyClick(event: any): void {
        event.target.active = false;
    }

    // update (dt) {}
}
