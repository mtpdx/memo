// 闭包（closure）指有权访问另一个函数作用域中变量的函数。
// 闭包: 我们fun 这个函数作用域 访问了另外一个函数 fnn 里面的局部变量 numm
function fnn() {
    var numm = 10;

    function fun() {
        console.log(numm);

    }
    fun();
}
fnn();

// 闭包的主要作用: 延伸了变量的作用范围
// 我们fn 外面的作用域可以访问fn 内部的局部变量
function fn() {
    var num = 10;
    return function() {
        console.log(num);
    }
}
var f = fn();
f();