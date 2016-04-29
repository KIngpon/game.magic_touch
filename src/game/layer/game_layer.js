/**
 * Created by zhaojm on 15/4/1.
 */


game.GameLayer = cc.Layer.extend({
    _hubLayer : null,
    _uiLayer : null,

    _hero : null,

    _score : null,
    _scorelabel : null,
    _heart : null,

    _mosters : null,
    _mosterGenerator : null,

    _tipsLbl : null,
    ctor:function () {
        this._super();
        var self = this;
        var winSize = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.gamelayer_plist);

        var bg = new cc.Sprite(res.bg_jpg);
        bg.attr({
            anchorX : 0.5,
            anchorY : 0,
            x : winSize.width / 2,
            y : 0,
        });
        this.addChild(bg);

        this._score = 0;
        this._scorelabel = cc.LabelTTF.create('0', 'Arial', 96);
        this._scorelabel.setColor(new cc.Color(255, 255, 255));

        this._scorelabel.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.85));
        this._scorelabel.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._scorelabel);


        this._hero = new game.Hero();
        this.addRole(this._hero);

        this._mosters = [];
        this._mosterGenerator = new game.MosterGenerator(this);

        this._heart = 3;
        this._uiLayer = new game.UILayer();
        this.addChild(this._uiLayer, 2);
        this._uiLayer.setHeart(this._heart);


        this._hubLayer = new game.HubLayer();
        this.addChild(this._hubLayer, 2);



        var tips_string = '红色开始，绿色结束';
        if(game._Config.language == game._Enum.language.en){
            tips_string = 'red start, green end';
        }
        this._tipsLbl = cc.LabelTTF.create(tips_string, 'Arial', 18);
        this._tipsLbl.setColor(new cc.Color(24, 200, 240));
        this._tipsLbl.setPosition(cc.p(winSize.width * 0.5, winSize.height - 20));
        this._tipsLbl.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._tipsLbl);



        this.schedule(this.update, 1);
    },

    update : function (dt) {
        this._super();
        var winSize = cc.winSize;
        this._mosterGenerator.update(dt);
    },

    addRole : function(role){
        role.addToLayer(this);
    },


    checkIsMatch : function(arr1, arr2){
        //cc.log(arr1, arr2);
        if(arr1.length == arr2.length){
            for(var i = 0; i < arr1.length; i++){
                if(arr1[i] == arr2[i]){
                    continue;
                }else{
                    return false;
                }
            }
            return true;
        }else {
            return false;
        }
    },

    checkIsRight : function(poslist){

        var i = 0;
        var ret = false;
        while(i < this._mosters.length){

            var moster = this._mosters[i];
            if(this.checkIsMatch(poslist, moster._segment_points) || this.checkIsMatch(poslist.reverse(), moster._segment_points)){
                this._mosters.splice(i, 1);
                moster.die();
                this.incScore();
                ret = true;
            }else{
                i++;
            }
        }

        return ret;

    },

    incScore : function(){
        this._score++;
        this._scorelabel.setString(this._score);
    },

    decHeart : function(){
        this._heart--;
        if(this._heart < 0){
            this._heart = 0;
        }
        this._uiLayer.setHeart(this._heart);
        if(this._heart == 0) {
            this.gameOver();
        }
    },

    gameOver : function(){
        cc.log('game over...');
        this.unschedule(this.update);

        //var scene = new game.GameOverScene();
        //scene.setData({
        //    score : this._score,
        //});
        //cc.director.runScene(scene);
        this.addChild(new game.GameOverLayer({score:this._score}), 3);
    },


});