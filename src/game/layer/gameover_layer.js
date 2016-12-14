/**
 * Created by zhaojm on 15/4/5.
 */
game.GameOverLayer = cc.Layer.extend({

    _score : null,
    ctor:function(data){
        this._super();
        var self = this;
        var winSize = cc.winSize;

        //if(game._Config.show_ads && game._Config.language == game._Enum.language.en) {
        //    window['Ads']['fullViewAds']();
        //}


        var bg = new cc.Sprite(res.gameover_bg_png);
        bg.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(bg);



        var self = this;
        var restartItem = new cc.MenuItemImage(res.restart_png,res.restart_png, res.restart_png, function(){
            cc.director.runScene(new game.GameScene());
        }, this);
        restartItem.setAnchorPoint(cc.p(1, 0.5));
        restartItem.setPosition(cc.p(winSize.width * 0.5 - 2, winSize.height * 0.5 - 150));


        var shareItem = new cc.MenuItemImage(res.share_png,res.share_png, res.share_png, function(){
            cc.log('share...');
            window.location.href="http://mingz.me";
        }, this);
        shareItem.setAnchorPoint(cc.p(0, 0.5));
        shareItem.setPosition(cc.p(winSize.width * 0.5 + 2, winSize.height * 0.5 - 150));


        var menu = new cc.Menu(restartItem, shareItem);
        //menu.alignItemsVertically();
        menu.setPosition( cc.p(0, 0));
        this.addChild(menu);



        //cc.log('data score...', data.score);
        var scorelabel = cc.LabelTTF.create('' + data.score, 'Arial', 24);
        scorelabel.setColor(new cc.Color(231, 231, 231));
        scorelabel.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5 + 50));
        scorelabel.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(scorelabel);

        var highscore = this.setHighScore('magic_touch_data', data);

        var highscorelabel = cc.LabelTTF.create(highscore + '', 'Arial', 24);
        highscorelabel.setColor(new cc.Color(231, 231, 231));
        highscorelabel.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5 - 40));
        highscorelabel.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(highscorelabel);


        var name = res.gameover_png;
        if(highscore == data.score){
            name = res.highscore_png;
        }
        var sprite = new cc.Sprite(name);
        this.addChild(sprite);
        sprite.setPosition(winSize.width * 0.5, winSize.height * 0.5 + 150);



    },


    setHighScore : function(key, value){
        var temp = cc.sys.localStorage.getItem(key);
        temp = JSON.parse(temp);

        cc.log('temp==', temp, 'value=', value);

        if(temp == null || temp == "" || temp == 'undefined'){
            cc.sys.localStorage.setItem(key, JSON.stringify(value));
        }else{
            if(temp.score < value.score) {
                cc.sys.localStorage.setItem(key, JSON.stringify(value));
            }
        }

        return JSON.parse(cc.sys.localStorage.getItem(key)).score;
    },


});