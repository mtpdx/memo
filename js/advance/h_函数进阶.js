/*  函数的定义方式 */
// 1. 自定义函数(命名函数) 

function fn() {};

// 2. 函数表达式 (匿名函数)

var fun = function() {};


// 3. 利用 new Function('参数1','参数2', '函数体');
//Function里面参数都必须是字符串形式;
var f = new Function('a', 'b', 'console.log(a + b)');
f(1, 2);
// 4. 所有函数都是 Function 的实例(对象)
console.dir(f);
// 5. 函数也属于对象
console.log(f instanceof Object);


/* 函数的调用方式 */

// 1. 普通函数
function fn() {
    console.log('人生的巅峰');

}
// fn();   fn.call()
// 2. 对象的方法
var o = {
    sayHi: function() {
        console.log('人生的巅峰');

    }
}
o.sayHi();
// 3. 构造函数
function Star() {};
new Star();
// 4. 绑定事件函数
// btn.onclick = function() {};   // 点击了按钮就可以调用这个函数
// 5. 定时器函数
// setInterval(function() {}, 1000);  这个函数是定时器自动1秒钟调用一次
// 6. 立即执行函数
(function() {
    console.log('人生的巅峰');
})();
// 立即执行函数是自动调用


/* 函数的不同调用方式决定了this 的指向不同 */
// 1. 普通函数 this 指向window
function fn() {
    console.log('普通函数的this' + this);
}
window.fn();
// 2. 对象的方法 this指向的是对象 o
var o = {
    sayHi: function() {
        console.log('对象方法的this:' + this);
    }
}
o.sayHi();
// 3. 构造函数 this 指向 ldh 这个实例对象 原型对象里面的this 指向的也是 ldh这个实例对象
function Star() {};
Star.prototype.sing = function() {

}
var ldh = new Star();
// 4. 绑定事件函数 this 指向的是函数的调用者 btn这个按钮对象
var btn = document.querySelector('button');
btn.onclick = function() {
    console.log('绑定时间函数的this:' + this);
};
// 5. 定时器函数 this 指向的也是window
window.setTimeout(function() {
    console.log('定时器的this:' + this);

}, 1000);
// 6. 立即执行函数 this还是指向window
(function() {
    console.log('立即执行函数的this' + this);
})();


/* 改变函数内this指向  js提供了三种方法  call()  apply()  bind() */
// 1. call()
var o = {
    name: 'andy'
}
function fn(a, b) {
    console.log(this);
    console.log(a + b);

};
fn.call(o, 1, 2);
// call 第一个可以调用函数 第二个可以改变函数内的this 指向
// call 的主要作用可以实现继承
function Father(uname, age, sex) {
    this.uname = uname;
    this.age = age;
    this.sex = sex;
}

function Son(uname, age, sex) {
    Father.call(this, uname, age, sex);
}
var son = new Son('刘德华', 18, '男');
console.log(son);

// 2. apply()
var o = {
    name: 'andy'
};

function fn(arr) {
    console.log(this);
    console.log(arr); // 'pink'

};
fn.apply(o, ['pink']);
// 1. 也是调用函数 第二个可以改变函数内部的this指向
// 2. 但是他的参数必须是数组(伪数组)
// 3. apply 的主要应用 比如说我们可以利用 apply 借助于数学内置对象求数组最大值 
// Math.max();
var arr = [1, 66, 3, 99, 4];
var arr1 = ['red', 'pink'];
// var max = Math.max.apply(null, arr);
var max = Math.max.apply(Math, arr);
var min = Math.min.apply(Math, arr);
console.log(max, min);

// 3. bind() 
var o = {
    name: 'andy'
};

function fn(a, b) {
    console.log(this);
    console.log(a + b);


};
var f = fn.bind(o, 1, 2);
f();
// 1. 不会调用原来的函数   可以改变原来函数内部的this 指向
// 2. 返回的是原函数改变this之后产生的新函数
// 3. 如果有的函数我们不需要立即调用,但是又想改变这个函数内部的this指向此时用bind
// 4. 我们有一个按钮,当我们点击了之后,就禁用这个按钮,3秒钟之后开启这个按钮
// var btn1 = document.querySelector('button');
// btn1.onclick = function() {
//     this.disabled = true; // 这个this 指向的是 btn 这个按钮
//     // var that = this;
//     setTimeout(function() {
//         // that.disabled = false; // 定时器函数里面的this 指向的是window
//         this.disabled = false; // 此时定时器函数里面的this 指向的是btn
//     }.bind(this), 3000); // 这个this 指向的是btn 这个对象
// }
var btns = document.querySelectorAll('button');
for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {
        this.disabled = true;
        setTimeout(function() {
            this.disabled = false;
        }.bind(this), 2000);
    }
}