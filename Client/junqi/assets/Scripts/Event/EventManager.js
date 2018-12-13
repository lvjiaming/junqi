
// todo 观察者（吕佳明）
const EventManager = cc.Class({

    ObserverList: null,
    statics: {
        getInstance() {
            if (!this.eventManger) {
                this.eventManger = new EventManager();
            }
            return this.eventManger;
        },
    },
    /**
     *  构造函数
     */
    ctor() {
        this.ObserverList = [];
    },
    /**
     *  添加观察者
     * @param target 观察的对象
     */
    addObserver(target) {
        this.ObserverList.forEach((item) => {
            if (item === target) {
                return true;
            }
        });
        if (target) {
            this.ObserverList.push(target);
        } else {
            cc.log(`target is null`)
        }
        cc.log(`this.ObserverList.length : ${this.ObserverList.length}`);
    },
    /**
     *  移除观察者
     * @param target 要移除观察的对象
     */
    removeObserver(target) {
        this.ObserverList.forEach((item, index) => {
            if (item === target) {
                this.ObserverList.splice(index, 1);
            }
        });
        cc.log(`this.ObserverList.length : ${this.ObserverList.length}`);
    },
    /**
     *  移除所有的观察者
     */
    removeAllObserver() {
        this.ObserverList = [];
    },
    /**
     *  通知观察者，有地方更改了
     * @param event 事件
     * @param msg 数据
     */
    notifyEvent(event, msg) {
        try {
            this.ObserverList.forEach((item, index) => {
                item.onEventMessage(event, msg);
            });
        } catch (err) {
            cc.error(`抛出异常：${err}`);
        }
    },
});
