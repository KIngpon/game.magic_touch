/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/9
 */
game.Line = cc.Class.extend({
    _drawNode : null,
    _layer : null,
    _touchCircleList : null,
    _lineWidth : null,
    ctor:function(){
        this._drawNode = new cc.DrawNode();
        this._lineWidth = 2;
    },

    addToLayer : function(layer){
        this._layer = layer;
        this._touchCircleList = this._layer._touchCircleList;
        layer.addChild(this._drawNode);
    },

    removeFromLayer : function(){
        this._drawNode.removeFromParent();
    },

    clear : function(){
        this._drawNode.clear();
    },

    refresh : function(poslist, endPos){
        var len = poslist.length;
        if(len <= 0){
            return;
        }
        this._drawNode.clear();

        for(var i = 0; i < len; i++){
            if(i == 0){
                continue;
            }else{
                this._drawNode.drawSegment(this._touchCircleList[poslist[i - 1]]._pos, this._touchCircleList[poslist[i]]._pos, this._lineWidth, cc.color(0, 0, 255));
            }
        }
        this._drawNode.drawSegment(this._touchCircleList[poslist[len - 1]]._pos, endPos, this._lineWidth, cc.color(0, 0, 255));
    },

    setError:function(poslist){
        var len = poslist.length;
        if(len <= 0){
            return;
        }
        this._drawNode.clear();
        for(var i = 0; i < len; i++){
            if(i == 0){
                continue;
            }else{
                this._drawNode.drawSegment(this._touchCircleList[poslist[i - 1]]._pos, this._touchCircleList[poslist[i]]._pos, this._lineWidth, cc.color(255, 0, 0));
            }
        }
    },

    setRight:function(poslist){
        var len = poslist.length;
        if(len <= 0){
            return;
        }
        this._drawNode.clear();
        for(var i = 0; i < len; i++){
            if(i == 0){
                continue;
            }else{
                this._drawNode.drawSegment(this._touchCircleList[poslist[i - 1]]._pos, this._touchCircleList[poslist[i]]._pos, this._lineWidth, cc.color(0, 255, 0));
            }
        }
    },

});