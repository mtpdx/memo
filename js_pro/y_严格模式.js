// 1.为整个脚本(script标签)开启严格模式 

'use strict';
//   下面的js 代码就会按照严格模式执行代码


(function() {
    'use strict';
})();

// 2.为某个函数开启严格模式

// 此时只是给fn函数开启严格模式
function fn() {
    'use strict';
    // 下面的代码按照严格模式执行
}

function fun() {
    // 里面的还是按照普通模式执行
}



/* 
严格模式的变化:
*/

// 1. 我们的变量名必须先声明再使用
// num = 10;
// console.log(num);
var num = 10;
console.log(num);
// 2.我们不能随意删除已经声明好的变量
// delete num;
// 3. 严格模式下全局作用域中函数中的 this 是 undefined。
// function fn() {
//     console.log(this); // undefined。

// }
// fn();
// 4. 严格模式下,如果 构造函数不加new调用, this 指向的是undefined 如果给他赋值则 会报错.
// function Star() {
//     this.sex = '男';
// }
// // Star();
// var ldh = new Star();
// console.log(ldh.sex);
// 5. 定时器 this 还是指向 window 
// setTimeout(function() {
//     console.log(this);

// }, 2000);
// a = 1;
// a = 2;
// 6. 严格模式下函数里面的参数不允许有重名
// function fn(a, a) {
//     console.log(a + a);

// };
// fn(1, 2);
// function fn() {}



