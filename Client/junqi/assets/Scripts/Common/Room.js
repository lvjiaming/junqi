const Room = cc.Class({
    _userList: null,
    ctor(data) {

    },
    /**
     *  设置房间玩家列表
     * @param data
     */
    setUserList(data) {
        this._userList = data;
    },
});