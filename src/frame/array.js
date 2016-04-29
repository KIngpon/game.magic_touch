/**
 * Created by zhaojm on 15/3/30.
 */
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
// 给数组添加删除功能
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);  // 从index开始，删除一个
    }
};
// 获取随机item
Array.prototype.getRandomItem = function(){
    var index = Math.floor(Math.random() * this.length);
    return this[index];
};