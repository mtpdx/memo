// 思考题 1：

var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function() {
        return function() {
            return this.name;
        };
    }
};

console.log(object.getNameFunc()())
var f = object.getNameFunc();
// 类似于
var f = function() {
    return this.name;
}
f();

// 思考题 2：

// var name = "The Window";　　
// var object = {　　　　
//     name: "My Object",
//     getNameFunc: function() {
//         var that = this;
//         return function() {
//             return that.name;
//         };
//     }
// };
// console.log(object.getNameFunc()())