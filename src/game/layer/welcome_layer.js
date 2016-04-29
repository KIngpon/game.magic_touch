/**
 * Created by zhaojm on 15/4/25.
 */
game.WelcomeLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        var winSize = cc.winSize;

        var bg = new cc.Sprite(res.welcome_bg_jpg);
        this.addChild(bg);
        bg.setPosition(winSize.width / 2, 0);
        bg.setAnchorPoint(cc.p(0.5, 0));


        var self = this;
        var startItem = new cc.MenuItemImage(res.start_png,res.start_png, res.start_png, function(){

            cc.director.runScene(new game.GameScene());

        }, this);

        startItem.setPosition(cc.p(cc.winSize.width / 2, 10));
        startItem.setAnchorPoint(cc.p(0.5,0));
        //moreitem.setScale(0.5);


        var menu = new cc.Menu(startItem);
        //menu.alignItemsVertically();
        this.addChild(menu);
        menu.setPosition( cc.p(0, 0));

    },
});