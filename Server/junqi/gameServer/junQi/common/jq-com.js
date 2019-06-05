/**
 * Created by Administrator on 2019/6/5.
 */
module.exports = {
    getGameLayout: (cb) => {
        fs.readFile("./gameServer/junQi/common/game-layout.json", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const dataStr = data.toString();
                let dataObj = {};
                if (dataStr) {
                    dataObj = JSON.parse(dataStr);
                }
                if (cb && cb instanceof Function) {
                    cb(dataObj);
                }
            }
        });
    },
};