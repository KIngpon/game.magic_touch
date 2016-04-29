/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/5
 */
game.BaseRole = cc.Class.extend({
    _sprite:null,
    ctor:function(){

    },

    getPosition:function(){
        return this._sprite.getPosition();
    },

    getPositionX:function(){
        return this._sprite.x;
    },

    getPositionY:function(){
        return this._sprite.y;
    },

    getContentSize:function(){
        return this._sprite.getContentSize();
    },


});