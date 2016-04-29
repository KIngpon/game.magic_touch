/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/11
 */
game.WelcomeScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        this.addChild(new game.WelcomeLayer());
    },
});