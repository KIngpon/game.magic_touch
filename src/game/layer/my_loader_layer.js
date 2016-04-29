/**
 * Created by zhaojm on 15/3/21.
 */
game.MyLoaderLayer = cc.LayerColor.extend({

    _loadingBar : null,
    _label : null,
    _spriteSheet : null,

    _startItem : null,

    _percent : null,

    ctor:function(){
        this._super(new cc.Color(43, 43, 43));

        var self = this;
        var winSize = cc.winSize;

        var logo = new cc.Sprite(loaderRes.loading2_png);
        logo.attr({
            x : winSize.width / 2,
            y : winSize.height * 0.5
        });
        this.addChild(logo);



        this._percent = cc.LabelTTF.create('LOADING...', 'Arial', 15);
        this._percent.setColor(new cc.Color(231, 231, 231));
        this._percent.setPosition(cc.p(winSize.width * 0.5, winSize.height  * 0.25));
        this._percent.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._percent);



        cc.loader.load(g_resources,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                self._percent.setString('LOADING...' + percent + "%");
                //self.loadingBar.setPercentage(percent * 100);
                //self._loadingBar.setScaleX(percent / 100);


            }, function () {

                self._percent.setString('LOADING...100%');

                //self._loadingBar.setScaleX( 1);
                //
                //self._startItem.runAction(new cc.FadeIn(2));

                cc.director.runScene(new game.WelcomeScene());

            });
    },


});