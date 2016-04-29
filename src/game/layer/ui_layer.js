/**
 * Created by zhaojm on 15/4/14.
 */
game.UILayer = cc.Layer.extend({

    _heart : null,
    ctor:function(){
        this._super();
        var winSize = cc.winSize;


        var node = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('heart.png'));
        node.attr({
            x : 0,
            y : winSize.height - 8,
            anchorX : 0,
            anchorY : 1,
        });
        this.addChild(node);




        this._heart = cc.LabelTTF.create('x 3', 'Arial', 18);
        //this._scoreLbl.setColor(new cc.Color(231, 231, 231));
        this._heart.setPosition(cc.p(node.getContentSize().width + 5, node.y - node.getContentSize().height / 2));
        this._heart.setAnchorPoint(cc.p(0, 0.5));
        this.addChild(this._heart);


    },

    setHeart : function(heart){
        this._heart.setString('x ' + heart);
    },





});