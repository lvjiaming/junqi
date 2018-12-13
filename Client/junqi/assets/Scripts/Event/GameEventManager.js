
const EventManager = require('./EventManager');
// const basePb = require('../protoBuf/base_pb.js');
const GameEventManager = cc.Class({
    extends: EventManager,
    gameSocket: null,
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
    },
    /**
     *  连接服务器，已经监听服务器一系列事件
     */
    connect(hostStr, callBack) {
        const self = this;
        this.gameSocket = new WebSocket(hostStr);
        this.gameSocket.onopen = () => {
            cc.log(`websocket has connect`);
            callBack();
        };
        this.gameSocket.onerror = () => {
            cc.log(`websocket connect error`);
        };
        this.gameSocket.onclose = () => {
            cc.log(`websocket has close`);
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
