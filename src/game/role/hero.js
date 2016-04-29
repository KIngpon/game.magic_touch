/**
 * Created by zhaojm on 15/4/27.
 */
game.Hero = game.BaseRole.extend({
    _sprite:null,
    _layer:null,

    ctor:function(){
        this._super();
        var winSize = cc.winSize;
        this._sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('hero/idle/0.png'));
        this._sprite.setPosition(winSize.width / 2, winSize.height * 0.1);
        this._sprite.setAnchorPoint(cc.p(0.5, 0));
    },

    addToLayer:function(layer){
        this._layer = layer;
        layer.addChild(this._sprite, 2);

        this.idle();
    },

    removeFromLayer:function(){
        this._sprite.removeFromParent();
    },

    idle : function(){
        var winSize = cc.winSize;
        var self = this;
        var frames = [];
        for(var i = 0; i < 6; i++){
            var frame = cc.spriteFrameCache.getSpriteFrame('hero/idle/' + i + '.png');
            frames.push(frame);
        }
        var animation = new cc.Animation(frames, 0.1);
        var animate = new cc.Animate(animation);

        var action = new cc.RepeatForever(animate);

        this._sprite.stopAllActions();
        this._sprite.runAction(action);
    },

    run : function(){
        var winSize = cc.winSize;
        var self = this;
        var frames = [];
        for(var i = 0; i < 7; i++){
            var frame = cc.spriteFrameCache.getSpriteFrame('hero/run/' + i + '.png');
            frames.push(frame);
        }
        var animation = new cc.Animation(frames, 0.1);
        var animate = new cc.Animate(animation);

        var x = Math.random() * winSize.width / 2 + winSize.width / 2;
        var seq = new cc.Sequence(
            new cc.Spawn(
                animate,
                new cc.MoveTo(0.2 * 5, cc.p(x, winSize.height * 0.1))
            ),
            new cc.CallFunc(function(){
                self.idle();
            })
        );
        this._sprite.stopAllActions();
        this._sprite.runAction(seq);
    },


});