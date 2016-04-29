



var loadingRes = {
    loading_png : "res/" + game._Config.language + "/loading.png"
};

var loaderRes = {
    //loader_plist : "res/" + game._Config.language + "/plist/loader.plist",
    //loader_png : "res/" + game._Config.language + "/plist/loader.png",

    //loading_bar_png : "res/common/loading_bar.png",
    loading2_png : "res/" + game._Config.language + "/loading2.png",
};

var res = {

    //camera_png : "res/common/camera.png",
    bg_jpg : "res/common/jpg/bg.jpg",

    gamelayer_png : "res/common/plist/gamelayer.png",
    gamelayer_plist : "res/common/plist/gamelayer.plist",

    gameover_bg_png : "res/" + game._Config.language + "/gameover_bg.png",
    share_png : "res/" + game._Config.language + "/share.png",
    restart_png : "res/" + game._Config.language + "/restart.png",

    highscore_png : "res/" + game._Config.language + "/highscore.png",
    gameover_png : "res/" + game._Config.language + "/gameover.png",

    welcome_bg_jpg : "res/common/jpg/welcome_bg.jpg",
    start_png : "res/" + game._Config.language + "/start.png",
};


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

//cc.log(g_resources);


var g_loaderResources = [];
for (var i in loaderRes) {
    g_loaderResources.push(loaderRes[i]);
}
