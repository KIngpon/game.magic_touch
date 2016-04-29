/**
 * Created by zhaojm on 15/4/27.
 */


game.Moster = game.BaseRole.extend({

    _layer : null,
    
    _node : null,
    _moster : null,
    _balloon : null,
    _rope : null,
    _drawNode : null,

    _balloon_explode_action : null,
    _moster_normal_action : null,
    _moster_fall_action : null,

    _segment_points : null,

    _posMatrix:null,

    ctor:function(pos) {
        this._super();
        var self = this;
        var winSize = cc.winSize;

        if(pos.x < 50 / 2){
            pos.x = 50 / 2;
        }else if(pos.x > winSize.width - 50 / 2){
            pos.x = winSize.width - 50 / 2;
        }

        this._node = new cc.Node();
        this._node.attr({
            x : pos.x,
            y : pos.y,
            width : 50,
            height : 150,
            anchorX : 0.5,
            anchorY : 0,
        });
        var nodeSize = this._node.getContentSize();

        this._moster = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('moster/normal/0.png'));
        this._moster.attr({
            x : nodeSize.width  * 0.5,
            y : 0,
            anchorX : 0.5,
            anchorY : 0,
        });
        this._moster_normal_action = new cc.RepeatForever(new cc.Animate(
            new cc.Animation([0, 1, 2, 3, 4].map(function (i) {
                return cc.spriteFrameCache.getSpriteFrame("moster/normal/" + i + ".png");
            }), 0.1)
        ));
        this._moster_fall_action = new cc.RepeatForever(new cc.Animate(
            new cc.Animation([0, 1, 2, 3, 4].map(function (i) {
                return cc.spriteFrameCache.getSpriteFrame("moster/fall/" + i + ".png");
            }), 0.1)
        ));
        this._node.addChild(this._moster, 2);
        this._moster.runAction(this._moster_normal_action);
        var mosterSize = this._moster.getContentSize();


        this._balloon = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('balloon/' + Math.floor(Math.random() * 7) + '.png'));
        this._balloon.attr({
            x : nodeSize.width * 0.5,
            y : nodeSize.height,
            anchorX : 0.5,
            anchorY : 1,
            scale : 2,

        });
        this._balloon_explode_action = new cc.Animate(
            new cc.Animation([0, 1, 2, 3, 4].map(function (i) {
                return cc.spriteFrameCache.getSpriteFrame("balloon_explode/" + i + ".png");
            }), 0.05)
        );
        this._node.addChild(this._balloon, 2);
        var balloonSize = this._balloon.getContentSize();

        this._rope = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('rope.png'));
        var ropeSize = this._rope.getContentSize();
        this._rope.attr({
            anchorX : 0.5,
            anchorY : 0,
            x : nodeSize.width * 0.5,
            y : mosterSize.height - 10,
            scaleY : (nodeSize.height - mosterSize.height - balloonSize.height) / ropeSize.height + 0.2,
        });
        this._node.addChild(this._rope);


        this._drawNode = new cc.DrawNode();
        this._balloon.addChild(this._drawNode);
        var posMatrix = [
            cc.p(balloonSize.width * 0.25, balloonSize.height * 0.25), cc.p(balloonSize.width * 0.5, balloonSize.height * 0.25), cc.p(balloonSize.width * 0.75, balloonSize.height * 0.25),
            cc.p(balloonSize.width * 0.25, balloonSize.height * 0.5), cc.p(balloonSize.width * 0.5, balloonSize.height * 0.5), cc.p(balloonSize.width * 0.75, balloonSize.height * 0.5),
            cc.p(balloonSize.width * 0.25, balloonSize.height * 0.75), cc.p(balloonSize.width * 0.5, balloonSize.height * 0.75), cc.p(balloonSize.width * 0.75, balloonSize.height * 0.75)
        ];
        this._posMatrix = posMatrix;


        [
            [0, 2], [3, 5], [6, 8],
            [0, 6], [1, 7], [2, 8]
        ].map(function(item){
            self._drawNode.drawSegment(posMatrix[item[0]], posMatrix[item[1]], 0.3, cc.color(255, 255, 255));
        });

    },

    addToLayer : function(layer){
        this._layer = layer;
        var self = this;
        var winSize = cc.winSize;

        this.drawSegments();

        layer.addChild(this._node);


        this._node.runAction(new cc.Sequence(new cc.MoveTo(7, cc.p(this._node.x, winSize.height * 0.1)), new cc.CallFunc(function(){
            // TODO one blood
            self._layer._mosters.remove(self);
            self._rope.removeFromParent();
            self._balloon.removeFromParent();
            self._node.runAction(new cc.MoveTo(2, cc.p(self._node.getContentSize().width * 0.5, winSize.height * 0.1)));
            self._layer.decHeart();
        })));
    },

    removeFromLayer : function(){
        this._node.removeFromParent();
    },

    die:function(){
        var self = this;
        this._rope.removeFromParent();
        this._balloon.runAction(new cc.Sequence(this._balloon_explode_action, new cc.CallFunc(function(){
            self._node.stopAllActions();
            self._node.runAction(new cc.Sequence(new cc.MoveTo(1 * self._node.y / cc.winSize.height, cc.p(self._node.x, 0 - self._node.height)), new cc.CallFunc(function(){
                // explode
                self.removeFromLayer();
            })));

            self._balloon.removeFromParent();
        })));
    },


    drawSegments : function(){
        //var segment_points = [0, 3, 4, 6];
        //cc.log(this._layer._score);
        var score = this._layer._score;
        var segment_points = [];
        var max = 3;
        var min = 3;
        if(score <= 3){
            max = 3;
            min = 3;
        }else if(score > 3 && score <= 10){
            max = 4;
            min = 4;
        }else if(score > 10 && score <= 15){
            max = 5;
            min = 4;
        }else if(score > 15 && score <= 20){
            max = 6;
            min = 4;
        }else if(score > 20 && score <= 25){
            max = 7;
            min = 4;
        }else if(score > 25 && score <= 30){
            max = 8;
            min = 4;
        }else if(score > 30 && score <= 35){
            max = 9;
            min = 4;
        }else if(score > 35 && score <= 40){
            max = 10;
            min = 4;
        }else if(score > 40){
            max = 10;
            min = 5;
        }

        var point_count = Math.floor(Math.random() * (max - min) + min);
        //cc.log(point_count, max, min);
        //point_count = 3;

        var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        while(point_count > 0){
            var p = nums.getRandomItem();
            var p_x = Math.floor(p / 3);
            var p_y = p % 3;

            // get middle one  check p is right
            if(segment_points.length != 0){
                var last = segment_points[segment_points.length - 1];

                var last_x = Math.floor(last / 3);
                var last_y = last % 3;

                var interval_x = Math.abs(last_x - p_x);
                var interval_y = Math.abs(last_y - p_y);
                if(interval_x == 0 && interval_y == 2){
                    var middle_p = cc.p(last_x, 1);
                    var middle_num = last_x * 3 + 1;
                    if(segment_points.indexOf(middle_num) < 0) {
                        // error
                        continue;
                    }
                }else if(interval_x == 2 && interval_y == 0){
                    var middle_p = cc.p(1, last_y);
                    var middle_num = 1 * 3 + last_y;
                    if(segment_points.indexOf(middle_num) < 0){
                        // error
                        continue;
                    }
                }else if(interval_x == 2 && interval_y == 2){
                    var middle_p = cc.p(1, 1);
                    var middle_num = 1 * 3 + 1;
                    if(segment_points.indexOf(middle_num) < 0){
                        // error
                        continue;
                    }
                }

            }


            segment_points.push(p);
            nums.remove(p);
            point_count--;
        }



        this._segment_points = segment_points;

        var radius = 2;
        var linewidth = 0.5;
        for(var i = 0; i < segment_points.length; i++){
            var item = segment_points[i];
            if(0 == i){

            }else{
                this._drawNode.drawSegment(this._posMatrix[segment_points[i - 1]], this._posMatrix[item], linewidth, cc.color(0, 0, 0));
                if(segment_points.length - 1 == i) {

                }else{
                    this._drawNode.drawDot(this._posMatrix[item], radius, cc.color(0, 0, 0));
                }
            }
        }

        this._drawNode.drawDot(this._posMatrix[segment_points[0]], radius, cc.color(255, 0, 0));
        this._drawNode.drawDot(this._posMatrix[segment_points[segment_points.length - 1]], radius, cc.color(0, 255, 0));
    },



});

