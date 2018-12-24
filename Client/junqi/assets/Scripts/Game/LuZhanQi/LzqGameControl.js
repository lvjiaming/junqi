const LzqGameControl = cc.Class({
    extends: cc.gameControl,
    itemList: null,

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
            // 绘制Item
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
                    this.itemList[i].push(info);
                }
            }
            this.itemList.forEach((item) => {
                item.forEach((item1) => {
                    if (item1.pos) {
                        const n_node = new cc.Node();
                        const gr = n_node.addComponent(cc.Graphics);
                        gr.lineWidth = 3;
                        gr.strokeColor = new cc.Color(cc.Color.RED);
                        gr.rect(item1.pos.x - cc.lzqGameCfg.ITEM_SIZE.W/2,
                            item1.pos.y - cc.lzqGameCfg.ITEM_SIZE.H/2,
                            cc.lzqGameCfg.ITEM_SIZE.W,
                            cc.lzqGameCfg.ITEM_SIZE.H
                        );
                        gr.stroke();
                        this._game.node.addChild(n_node);
                    }
                });
            });
            cc.log(this.itemList);
        } else {
            cc.error("this._game not init");
        }
    },
});
cc.lzq_gameControl = LzqGameControl;