
const EventManager = require('./EventManager');
// const basePb = require('../protoBuf/base_pb.js');
const GameEventManager = cc.Class({
    extends: EventManager,
    gameSocket: null,  // 连接
    hostStr: null, // 连接地址
    _isSelfClose: null,  // 是否是自己主动断开连接

    _reconnectCurTime: null,  // 当前重连的次数
    _reconnectMaxTime: null, // 重连的最大次数
    _reconnectTimes: null, // 重连的时间间隔
    _reconnectTimer: null,  // 重连的定时器

    _curListen: null,  // 当前监听的对象（会发送一系列回调函数）
    // statics: {
    //     getInstance() {
    //         if (!this.gameEventManager) {
    //             this.gameEventManager = new GameEventManager();
    //         }
    //         return this.gameEventManager;
    //     },
    // },
    /**
     *  构造函数
     */
    ctor() {
        this.gameSocket = null;
        this._reconnectCurTime = 0;
        this._reconnectMaxTime = 10;
        this._reconnectTimes = 1000;
        this._isSelfClose = false;
        this._reconnectTimer = null;
    },
    /**
     *  监听对象（会发送一系列特殊回调）
     *  reconnectFail  // 重连失败
     *  reconnectSuc  // 重连成功
     * @param target
     */
    setListen(target) {
        this._curListen = target;
    },
    /**
     *  移除监听
     */
    removeListen() {
        this._curListen = null;
    },
    /**
     *  连接服务器，已经监听服务器一系列事件
     */
    connect(hostStr, callBack) {
        this.hostStr = hostStr;
        const self = this;
        this.gameSocket = new WebSocket(hostStr);
        this.gameSocket.onopen = () => {
            cc.log(`websocket has connect`);
            if (callBack && callBack instanceof Function) {
                callBack();
            }
        };
        this.gameSocket.onerror = () => {
            cc.log(`websocket connect error`);
            // this.reconnect();
        };
        this.gameSocket.onclose = () => {
            cc.log(`websocket has close`);
            if (this._isSelfClose) {
                cc.log(`玩家主动断开连接，不重连`);
            } else {
                this.reconnect();
            }
        };
        this.gameSocket.onmessage = function (data) {
            data = JSON.parse(data.data);
            self.onMsg(data.msgId, data.msgData);
            return;
            //  todo 以下是用protobuf传输数据写法
            if (cc.sys.isNative) {
                self.handleData(data.data);
            } else {
                const fileReader = new FileReader();  //  在浏览器中读取文件
                fileReader.onload = function (progressEvent) {  //  读取文件完成后触发（成功读取）
                    const utfs = this.result;  //  result就是读取的结果
                    self.handleData(utfs);
                };
                fileReader.readAsArrayBuffer(data.data);
            }
        };
        this.gameSocket.sendMessage = (msgId, msgData) => {
            if (this.gameSocket.readyState === WebSocket.OPEN) {
                this.gameSocket.send(JSON.stringify({msgId: msgId, msgData: msgData}));
            } else {
                cc.error(`websocket connect error: ${this.gameSocket.readyState}`);
            }
        };
    },
    reconnect() {
        this._reconnectCurTime ++;
        if (this._reconnectCurTime > this._reconnectMaxTime) {
            cc.log(`重连次数已达最大`);
            cc.comTip.hide();
            if (this._curListen && this._curListen.reconnectFail) {
                this._curListen.reconnectFail();
            }
            return;
        }
        cc.log(`正在进行第次${this._reconnectCurTime}重连`);
        cc.comTip.show(`正在进行第次${this._reconnectCurTime}重连。。`);
        this._reconnectTimer = setTimeout(() => {
            this.connect(this.hostStr, () => {
                cc.log(`已重连。。。`);
                cc.comTip.hide();
                cc.comTip.show(`重连成功`, 2);
                clearTimeout(this._reconnectTimer);
                this._reconnectCurTime = 0;
                if (this._curListen && this._curListen.reconnectSuc) {
                    this._curListen.reconnectSuc();
                }
            });
        }, this._reconnectTimes);
    },
    /**
     *  发送消息给服务端
     * @param msgId 消息的id
     * @param msgData 消息的数据
     */
    sendMessage(msgId, msgData) {
        if (msgData === null || msgData === undefined) {
            msgData = null;
        }
        this.gameSocket.sendMessage(msgId, msgData);
    },
    /**
     *  关闭与服务器的连接
     */
    close() {
        this.gameSocket.close();
        this._isSelfClose = true;
    },
    /**
     *  处理数据（反序列化以及转化）
     * @param data 数据
     */
    handleData(data) {
        const bytes = new Uint8Array(data);  // 转化数据
        let msgId = bytes[0];  //  协议id放在uint8Array的第一位
        const body = new Uint8Array(data, 1, data.byteLength - 1);
        this.onMsg(msgId, body);
    },
});
