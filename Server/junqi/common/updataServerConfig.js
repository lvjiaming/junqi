/**
 * Created by Administrator on 2018/12/17.
 */
module.exports = {
    updataServerConfig(config, cb) {
        if (serverConfig && serverConfig.gameServer && serverConfig.gameServer[config.gameid]) {
            serverConfig.gameServer[config.gameid] = config;
            fs.writeFile("../junqi/config/serverConfig.json", JSON.stringify(serverConfig), (err) => {
                if (err) {
                    console.error("写入失败",err);
                } else {
                    console.log("更新成功")
                    if (cb && cb instanceof Function) {
                        cb();
                    }
                }
            });
        }
    },
};