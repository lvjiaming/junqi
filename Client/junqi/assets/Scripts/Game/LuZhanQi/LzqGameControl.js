const LzqGameControl = cc.Class({
    extends: cc.gameControl,
    itemList: null,
    dbyList: null, // 大本营点的表
    xyList: null, // 行营点的表
    qxList: null, // 前线点的表
    sjList: null, // 山界点的表
    ctor() {
        this.dbyList = [
            {x: 1, y: 0},
            {x: 3, y: 0},
            {x: 1, y: 12},
            {x: 3, y: 12},
        ];
        this.xyList = [
            {x: 1, y: 2},
            {x: 3, y: 2},
            {x: 2, y: 3},
            {x: 1, y: 4},
            {x: 3, y: 4},
            {x: 1, y: 8},
            {x: 3, y: 8},
            {x: 2, y: 9},
            {x: 1, y: 10},
            {x: 3, y: 10},
        ];
        this.qxList = [
            {x: 0, y: 6},
            {x: 2, y: 6},
            {x: 4, y: 6},
        ];
        this.sjList = [
            {x: 1, y: 6},
            {x: 3, y: 6},
        ];
    },

    /**
     *  生成地图
     */
    createMap() {
        this.itemList = [];
        if (this._game) {
            // 绘制边界
            if (this._game.bianJie) {
                this._game.bianJie.lineWidth = 10;
                this._game.bianJie.strokeColor = new cc.Color(cc.Color.RED);
                this._game.bianJie.rect(-cc.lzqGameCfg.MAT_SIZE.W/2, -cc.lzqGameCfg.MAT_SIZE.H/2, cc.lzqGameCfg.MAT_SIZE.W, cc.lzqGameCfg.MAT_SIZE.H);
                this._game.bianJie.stroke();
            }
            // 生成ItemList
            for (let i = 0; i < cc.lzqGameCfg.ITEM_LIST.X; i++) {
                for (let j = 0; j < cc.lzqGameCfg.ITEM_LIST.Y; j++) {
                    const info = {};
                    const pos = {};
                    if (!this.itemList[i]) {
                        this.itemList[i] = [];
                    }
                    pos.x = -cc.lzqGameCfg.MAT_SIZE.W/2 + 45 + (i * cc.lzqGameCfg.ITEM_SIZE.SPACE_X);
                    pos.y = -cc.lzqGameCfg.MAT_SIZE.H/2 + 40 + (j * cc.lzqGameCfg.ITEM_SIZE.SPACE_Y);
                    if (j == 6) {
                        pos.y = pos.y + 25;
                    }
                    if (j > 6) {
                        pos.y = pos.y + 50;
                    }
                    info.pos = pos;
                    info.xiabiao = {x: i, y: j};
                    info.type = this.getItemTypeByZuoBiao(i, j);
                    this.itemList[i].push(info);
                }
            }
            // 绘制每个站点
            this.itemList.forEach((item) => {
                item.forEach((item1, index1) => {
                    if (item1.pos) {
                        const n_node = new cc.Node();
                        const name_node = new cc.Node();
                        name_node.position = cc.v2(item1.pos.x, item1.pos.y);
                        name_node.anchor = cc.v2(0.5, 0.5);
                        const font = name_node.addComponent(cc.Label);
                        name_node.color = new cc.Color(cc.Color.RED);
                        const gr = n_node.addComponent(cc.Graphics);
                        gr.lineWidth = 3;
                        gr.strokeColor = new cc.Color(cc.Color.RED);
                        gr.fillColor = new cc.Color(cc.Color.WHITE);
                        switch (item1.type) {
                            case cc.lzqGameCfg.SEAT_TYPE.XING_YING: {
                                font.lineHeight = 24;
                                font.fontSize = 24;
                                font.string = "行\n营";
                                // name_node.y = name_node.y + 12;
                                gr.circle(item1.pos.x, item1.pos.y, cc.lzqGameCfg.ITEM_SIZE.W/2);
                                break;
                            }
                            case cc.lzqGameCfg.SEAT_TYPE.QIAN_XIAN: {
                                font.lineHeight = 20;
                                font.fontSize = 20;
                                font.string = "前\n线";
                                const newNode = cc.instantiate(name_node);
                                newNode.angle = 180;
                                newNode.x = name_node.x + 12;
                                newNode.y = newNode.y - 2;
                                n_node.addChild(newNode);
                                // name_node.y = name_node.y + 12;
                                name_node.x = name_node.x - 12;
                                gr.rect(item1.pos.x - cc.lzqGameCfg.ITEM_SIZE.W/2,
                                    item1.pos.y - cc.lzqGameCfg.ITEM_SIZE.W/2,
                                    cc.lzqGameCfg.ITEM_SIZE.W,
                                    cc.lzqGameCfg.ITEM_SIZE.W
                                );
                                break;
                            }
                            case cc.lzqGameCfg.SEAT_TYPE.SHAN_JIE: {
                                font.lineHeight = 30;
                                font.fontSize = 30;
                                font.string = "山\n界";
                                name_node.angle = 90;
                                // name_node.y = name_node.y + 12;
                                gr.circle(item1.pos.x, item1.pos.y, cc.lzqGameCfg.ITEM_SIZE.W/2 + 10);
                                break;
                            }
                            case cc.lzqGameCfg.SEAT_TYPE.DA_BEN_YING: {
                                font.fontSize = 20;
                                font.lineHeight = 20;
                                font.string = "大本营";
                                name_node.color = new cc.Color(cc.Color.WHITE);
                                gr.fillColor = new cc.Color(cc.Color.RED);
                                gr.rect(item1.pos.x - cc.lzqGameCfg.ITEM_SIZE.W/2 - 5,
                                    item1.pos.y - cc.lzqGameCfg.ITEM_SIZE.H/2 - 5,
                                    cc.lzqGameCfg.ITEM_SIZE.W + 10,
                                    cc.lzqGameCfg.ITEM_SIZE.H + 10
                                );
                                break;
                            }
                            default: {
                                font.fontSize = 18;
                                font.lineHeight = 18;
                                font.string = "兵站";
                                gr.rect(item1.pos.x - cc.lzqGameCfg.ITEM_SIZE.W/2,
                                    item1.pos.y - cc.lzqGameCfg.ITEM_SIZE.H/2,
                                    cc.lzqGameCfg.ITEM_SIZE.W,
                                    cc.lzqGameCfg.ITEM_SIZE.H
                                );
                            }
                        }
                        if (index1 > 6) {
                            name_node.angle = 180;
                        }
                        gr.stroke();
                        gr.fill();
                        n_node.addChild(name_node);
                        this._game.node.addChild(n_node, 10);
                        item1.node = n_node;
                    }
                });
            });
            // 绘制路线
            this.itemList.forEach((item1, index1) => {
                item1.forEach((item2, index2) => {
                    if (item2.type != cc.lzqGameCfg.SEAT_TYPE.SHAN_JIE) {
                        // 上
                        if ((index2 + 1) < item1.length && item1[index2 + 1].type != cc.lzqGameCfg.SEAT_TYPE.SHAN_JIE) {
                            const item3 = item1[index2 + 1];
                            this.checkTwoPointCanConnect(item2, item3);
                        }
                        // 下
                        if ((index2 - 1) >= 0 && item1[index2 - 1].type != cc.lzqGameCfg.SEAT_TYPE.SHAN_JIE) {
                            const item3 = item1[index2 - 1];
                            this.checkTwoPointCanConnect(item2, item3);
                        }
                        // 左
                        if ((index1 - 1) >= 0 && this.itemList[index1 - 1][index2].type != cc.lzqGameCfg.SEAT_TYPE.SHAN_JIE) {
                            const item3 = this.itemList[index1 - 1][index2];
                            this.checkTwoPointCanConnect(item2, item3);
                        }
                        // 右
                        if ((index1 + 1) < this.itemList.length && this.itemList[index1 + 1][index2].type != cc.lzqGameCfg.SEAT_TYPE.SHAN_JIE) {
                            const item3 = this.itemList[index1 + 1][index2];
                            this.checkTwoPointCanConnect(item2, item3);
                        }
                        if (item2.type == cc.lzqGameCfg.SEAT_TYPE.XING_YING) {
                            // 右上
                            let item3 = this.itemList[index1 + 1][index2 + 1];
                            this.checkTwoPointCanConnect(item2, item3, () => {
                                    const n_node = new cc.Node();
                                    const gr = n_node.addComponent(cc.Graphics);
                                    gr.lineWidth = 3;
                                    gr.strokeColor = new cc.Color(cc.Color.RED);
                                    gr.moveTo(item2.pos.x, item2.pos.y);
                                    gr.lineTo(item3.pos.x, item3.pos.y);
                                    gr.stroke();
                                    this._game.node.addChild(n_node);
                            });
                            // 右下
                            item3 = this.itemList[index1 + 1][index2 - 1];
                            this.checkTwoPointCanConnect(item2, item3, () => {
                                const n_node = new cc.Node();
                                const gr = n_node.addComponent(cc.Graphics);
                                gr.lineWidth = 3;
                                gr.strokeColor = new cc.Color(cc.Color.RED);
                                gr.moveTo(item2.pos.x, item2.pos.y);
                                gr.lineTo(item3.pos.x, item3.pos.y);
                                gr.stroke();
                                this._game.node.addChild(n_node);
                            });
                            // 左上
                            item3 = this.itemList[index1 - 1][index2 + 1];
                            this.checkTwoPointCanConnect(item2, item3, () => {
                                const n_node = new cc.Node();
                                const gr = n_node.addComponent(cc.Graphics);
                                gr.lineWidth = 3;
                                gr.strokeColor = new cc.Color(cc.Color.RED);
                                gr.moveTo(item2.pos.x, item2.pos.y);
                                gr.lineTo(item3.pos.x, item3.pos.y);
                                gr.stroke();
                                this._game.node.addChild(n_node);
                            });
                            // 左下
                            item3 = this.itemList[index1 - 1][index2 - 1];
                            this.checkTwoPointCanConnect(item2, item3, () => {
                                const n_node = new cc.Node();
                                const gr = n_node.addComponent(cc.Graphics);
                                gr.lineWidth = 3;
                                gr.strokeColor = new cc.Color(cc.Color.RED);
                                gr.moveTo(item2.pos.x, item2.pos.y);
                                gr.lineTo(item3.pos.x, item3.pos.y);
                                gr.stroke();
                                this._game.node.addChild(n_node);
                            });
                        }
                    }
                    if (index1 == 0) {
                        if (index2 == 1 || index2 == 5 || index2 == 7 || index2 == 11) {
                            // 此四行为铁路
                            const n_node = new cc.Node();
                            const gr = n_node.addComponent(cc.Graphics);
                            gr.strokeColor = new cc.Color(cc.Color.BLACK);
                            gr.lineWidth = 5;
                            gr.moveTo(this.itemList[0][index2].pos.x, this.itemList[0][index2].pos.y);
                            gr.lineTo(this.itemList[this.itemList.length - 1][index2].pos.x, this.itemList[this.itemList.length - 1][index2].pos.y);
                            gr.stroke();
                            this._game.node.addChild(n_node);
                        } else if (index2 != 6) {
                            const n_node = new cc.Node();
                            const gr = n_node.addComponent(cc.Graphics);
                            gr.strokeColor = new cc.Color(cc.Color.RED);
                            gr.lineWidth = 3;
                            gr.moveTo(this.itemList[0][index2].pos.x, this.itemList[0][index2].pos.y);
                            gr.lineTo(this.itemList[this.itemList.length - 1][index2].pos.x, this.itemList[this.itemList.length - 1][index2].pos.y);
                            gr.stroke();
                            this._game.node.addChild(n_node);
                        }
                    }
                });
                if (index1 == 0 || index1 == this.itemList.length - 1) {
                    // 此列为铁路线
                    const n_node = new cc.Node();
                    const gr = n_node.addComponent(cc.Graphics);
                    gr.strokeColor = new cc.Color(cc.Color.RED);
                    gr.lineWidth = 3;
                    gr.moveTo(item1[0].pos.x, item1[0].pos.y);
                    gr.lineTo(item1[item1.length - 1].pos.x, item1[item1.length - 1].pos.y);
                    gr.stroke();
                    gr.lineWidth = 5;
                    gr.strokeColor = new cc.Color(cc.Color.BLACK);
                    gr.moveTo(item1[1].pos.x, item1[1].pos.y);
                    gr.lineTo(item1[item1.length - 2].pos.x, item1[item1.length - 2].pos.y);
                    gr.stroke();
                    this._game.node.addChild(n_node);
                } else {
                    const n_node = new cc.Node();
                    const gr = n_node.addComponent(cc.Graphics);
                    gr.strokeColor = new cc.Color(cc.Color.RED);
                    gr.lineWidth = 3;
                    gr.moveTo(item1[0].pos.x, item1[0].pos.y);
                    gr.lineTo(item1[5].pos.x, item1[5].pos.y);
                    gr.stroke();
                    gr.lineWidth = 3;
                    gr.strokeColor = new cc.Color(cc.Color.RED);
                    gr.moveTo(item1[7].pos.x, item1[7].pos.y);
                    gr.lineTo(item1[item1.length - 1].pos.x, item1[item1.length - 1].pos.y);
                    gr.stroke();
                    if (index1 == 2) {
                        gr.lineWidth = 5;
                        gr.strokeColor = new cc.Color(cc.Color.BLACK);
                        gr.moveTo(item1[5].pos.x, item1[5].pos.y);
                        gr.lineTo(item1[7].pos.x, item1[7].pos.y);
                        gr.stroke();
                    }
                    this._game.node.addChild(n_node);
                }
            });
            cc.log("划线次数：", this.nums);
        } else {
            cc.error("this._game not init");
        }
    },
    /**
     *  根据坐标返回点的类型
     */
    getItemTypeByZuoBiao(x, y) {
        if (this.checkIsDby(x, y)) {
            return cc.lzqGameCfg.SEAT_TYPE.DA_BEN_YING;
        }
        if (this.checkIsXy(x, y)) {
            return cc.lzqGameCfg.SEAT_TYPE.XING_YING;
        }
        if (this.checkIsQx(x, y)) {
            return cc.lzqGameCfg.SEAT_TYPE.QIAN_XIAN;
        }
        if (this.checkIsSj(x, y)) {
            return cc.lzqGameCfg.SEAT_TYPE.SHAN_JIE;
        }
        return cc.lzqGameCfg.SEAT_TYPE.BING_ZHAN;
    },
    /**
     *  检查点是否是大本营
     */
    checkIsDby(x, y) {
        let result = false;
        for (let i = 0; i < this.dbyList.length; i++) {
            if (this.dbyList[i].x == x && this.dbyList[i].y == y) {
                result = true;
                break;
            }
        }
        return result;
    },
    /**
     *  检查点是否是行营
     */
    checkIsXy(x, y) {
        let result = false;
        for (let i = 0; i < this.xyList.length; i++) {
            if (this.xyList[i].x == x && this.xyList[i].y == y) {
                result = true;
                break;
            }
        }
        return result;
    },
    /**
     *  检查点是否是前线
     */
    checkIsQx(x, y) {
        let result = false;
        for (let i = 0; i < this.qxList.length; i++) {
            if (this.qxList[i].x == x && this.qxList[i].y == y) {
                result = true;
                break;
            }
        }
        return result;
    },
    /**
     *  检查点是否是山界
     */
    checkIsSj(x, y) {
        let result = false;
        for (let i = 0; i < this.sjList.length; i++) {
            if (this.sjList[i].x == x && this.sjList[i].y == y) {
                result = true;
                break;
            }
        }
        return result;
    },
    /**
     *  检查一个点是否在一个点集合里
     */
    checkPointInList(point, list) {
        let isIn = false;
        list.forEach((item) => {
            if (item.x == point.x && item.y == point.y) {
                isIn = true;
            }
        });
        return isIn;
    },
    /**
     *  判断连个点是否能连接
     */
    checkTwoPointCanConnect(item2, item3, cb) {
        if (!item2.pointList) {
            item2.pointList = [];
        }
        if (!item3.pointList) {
            item3.pointList = [];
        }
        let isCan = false;
        if (!this.checkPointInList(item3.xiabiao, item2.pointList)) {
            item2.pointList.push(item3.xiabiao);
            isCan = true;

        }
        if (!this.checkPointInList(item2.xiabiao, item3.pointList)) {
            item3.pointList.push(item2.xiabiao);
            isCan = true;
        }
        if (isCan && cb && cb instanceof Function) {
            cb();
            if (!this.nums) {
                this.nums = 0;
            }
            this.nums ++;
        }
    },
});

cc.lzq_gameControl = LzqGameControl;