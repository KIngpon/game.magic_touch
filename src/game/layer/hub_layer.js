/**
 * Created by zhaojm on 15/4/17.
 */
game.HubLayer = cc.Layer.extend({
    _touchListener : null,

    _touchCircleList : null,

    _touchedList : null,

    _line : null,

    ctor:function(){
        this._super();
        var self = this;
        var winSize = cc.winSize;

        this._touchCircleList = [];
        this._touchedList = [];

        this.addTouchCircle();

        this._line = new game.Line();
        this.addRole(this._line);

        this.addTouchListener();

    },

    addTouchCircle : function(){
        var self = this;
        var winSize = cc.winSize;

        var x1 = winSize.width * 0.3;
        var x2 = winSize.width * 0.5;
        var x3 = winSize.width * 0.7;

        var y1 = winSize.height * 0.1;
        var y2 = winSize.height * 0.1 + winSize.width * 0.2;
        var y3 = winSize.height * 0.1 + winSize.width * 0.2 * 2;

        [
            cc.p(x1, y1), cc.p(x2, y1), cc.p(x3, y1),
            cc.p(x1, y2), cc.p(x2, y2),cc.p(x3, y2),
            cc.p(x1, y3), cc.p(x2, y3), cc.p(x3, y3)
        ].map(function(item){
                var tc = new game.TouchCircle(item);
                self.addRole(tc);
                self._touchCircleList.push(tc);
            });
    },

    addRole : function(role){
        role.addToLayer(this);
    },


    addTouchListener : function(){
        var self = this;
        var winSize = cc.winSize;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true   ,       // true 为不向下传递
            onTouchBegan: function(touch, event){
                //cc.log('touchbegan');
                self.parent._hero.run();
                self.setNormal();
                self._touchedList = [];
                var touchPos = touch.getLocation();
                self.checkTouched(touchPos);
                return true;
            }.bind(this),
            onTouchMoved: function(touch, event){
                //cc.log('touch moved');
                var touchPos = touch.getLocation();
                self.checkTouched(touchPos);
                self._line.refresh(self._touchedList, touchPos);
            }.bind(this),
            onTouchEnded: function(touch, event){
                //cc.log('touch ended');
                //var touchPos = touch.getLocation();
                //this.checkTouched(touchPos);
                var isRight = self.parent.checkIsRight(self._touchedList);
                self.doRightOrError(isRight);
                //self.parent.doRightOrError(isRight);
            }.bind(this),
            //onTouchCancel: this.onTouchCancel
        });
        this._touchListener = listener;
        cc.eventManager.addListener(listener, this);
    },

    checkTouched : function(pos){
        var self = this;
        for(var i = 0; i < this._touchCircleList.length; i++){
            var item = this._touchCircleList[i];
            if(item.isTouched(pos)){
                if(self._touchedList.indexOf(i) < 0){
                    self._touchedList.push(i);
                    item.setTouched();
                }
                break;
            }
        }

    },

    doRightOrError : function(isRight){
        //cc.log(isRight);
        if(isRight){
            this.setRight();
        }else{
            this.setError();
        }
    },

    setRight : function(){
        for(var i = 0; i < this._touchedList.length; i++){
            this._touchCircleList[this._touchedList[i]].setRight();
        }
        this._line.setRight(this._touchedList);
        var self = this;
        this.runAction(new cc.Sequence(new cc.DelayTime(0.1), new cc.CallFunc(function(){
            self.setNormal();
        })));
    },
    setError:function(){
        for(var i = 0; i < this._touchedList.length; i++){
            this._touchCircleList[this._touchedList[i]].setError();
        }
        this._line.setError(this._touchedList);
        var self = this;
        this.runAction(new cc.Sequence(new cc.DelayTime(0.1), new cc.CallFunc(function(){
            self.setNormal();
        })));
    },

    setNormal : function(){
        for(var i = 0; i < this._touchedList.length; i++){
            this._touchCircleList[this._touchedList[i]].setNormal();
        }
        this._line.clear();
    },




});