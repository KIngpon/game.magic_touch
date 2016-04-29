/**
 * Created by zhaojm on 15/4/27.
 */
game.MosterGenerator = cc.Class.extend({
    _layer : null,
    _timeCount : null,
    _timeInterval : null,
    ctor:function(layer){
        this._layer = layer;
        this._timeCount = 0;
        this._timeInterval = 0;
    },

    update:function(dt){
        this._timeCount += dt;
        if(this._timeCount >= this._timeInterval){
            this._timeCount = 0;
            this._timeInterval = this.getRandomTime();

            var pos = this.getRandomPos();
            this.generate(pos);
        }


        //while(this._layer._mosters.length > 0){
        //    var m = this._layer._mosters[0];
        //    if(m.isOutOfView()){
        //        m.removeFromLayer();
        //        this._layer._mosters.splice(0, 1);
        //        cc.log('remove one');
        //    }else{
        //        break;
        //    }
        //}

    },

    getRandomTime:function(){
        return Math.random() * 3 + 3;
    },

    generate:function(pos){
        var moster = new game.Moster(pos);
        this._layer.addRole(moster);
        this._layer._mosters.push(moster);
    },

    getRandomPos:function(){

        var x = Math.random() * cc.winSize.width;
        return cc.p(x, cc.winSize.height);
    },

});