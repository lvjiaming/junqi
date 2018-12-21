const GameControl = cc.Class({
    statics: {
        getInstance() {
            if (!this.gameControl) {
                this.gameControl = new GameControl();
            }
            return this.gameControl;
        },
    },
    _gameNode: null,
    ctor(node) {
        this._gameNode = node;
    },
    /**
     *  生成地图
     */
    createMap() {

    },
});
cc.gameControl = GameControl;