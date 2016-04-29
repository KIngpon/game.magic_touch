/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/9
 */
game.TouchCircle = cc.Class.extend({
    _drawNode : null,
    _pos : null,
    _radius : null,
    _layer : null,
    ctor:function(pos){
        this._pos = pos;
        this._drawNode = new cc.DrawNode();
        this._radius = 20;
    },

    addToLayer : function(layer){
        layer.addChild(this._drawNode);
        this.setNormal();
        //this.setError();
        //this.setTouched();
    },

    removeFromLayer : function(){
        this._drawNode.removeFromParent();
    },

    setNormal:function(){
        this._drawNode.clear();
        this._drawNode.drawDot(this._pos, this._radius / 4, cc.color(192, 224, 215));
        this._drawNode.drawCircle(this._pos, this._radius, 360, 100, false, 1, cc.color(192, 224, 215));
    },

    setError:function(){
        this._drawNode.clear();
        this._drawNode.drawDot(this._pos, this._radius / 4, cc.color(255, 0, 0));
        this._drawNode.drawCircle(this._pos, this._radius, 360, 100, false, 1, cc.color(255, 0, 0));
    },

    setRight:function(){
        this._drawNode.clear();
        this._drawNode.drawDot(this._pos, this._radius / 4, cc.color(0, 255, 0));
        this._drawNode.drawCircle(this._pos, this._radius, 360, 100, false, 1, cc.color(0, 255, 0));
    },

    setTouched:function(){
        this._drawNode.clear();
        this._drawNode.drawDot(this._pos, this._radius / 4, cc.color(0, 0, 255));
        this._drawNode.drawCircle(this._pos, this._radius, 360, 100, false, 1, cc.color(0, 0, 255));
    },

    isTouched : function(pos){
        return cc.pDistance(this._pos, pos) < this._radius;
    },

});