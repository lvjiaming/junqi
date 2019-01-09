const Room = cc.Class({
    // statics: {
    //     gameid: null,
    // },
    _userList: null,
    _roomCfg: null,
    ctor(data) {
        this.setUserList(data.userLst);
        this.setRoomCfg(data.roomCfg);
    },
    /**
     *  设置房间玩家列表
     * @param data
     */
    setUserList(data) {
        this._userList = data;
    },
    /**
     *  获取房间玩家列表
     * @returns {null}
     */
    getUserList() {
        return this._userList;
    },
    /**
     *  设置房间的配置
     * @param cfg
     */
    setRoomCfg(cfg) {
        this._roomCfg = cfg;
    },
    /**
     *  获取房间的配置
     * @returns {null}
     */
    getRoomCfg() {
        return this._roomCfg;
    },
});
cc.room = Room;