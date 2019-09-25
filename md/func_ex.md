> es5

```javascript
// 函数的定义

// 1.具名函数
function(){}

// 2.匿名函数
var fn = function(){}

// 3.new Function ([arg1[, arg2[, ...argN]],] functionBody)
var f = new Function('a', 'b', 'console.log(a + b)');
f(1, 2);		// 3
// 所有函数都是 Function 的实例(对象)
console.log(f instanceof Function);			// true
console.log(f.constructor === Function);	// true
console.log(f instanceof Object);			// true
```



```javascript
// 函数调用方式

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
```



```javascript
// 不同调用方式this指向

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
Star.prototype.sing = function() {}
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
```



```javascript
// 改变函数this指向

// 1.call()	
// fun.call(thisArg, arg1, arg2, ...)
// 1)调用函数 2)改变函数内this指向
var o = {
    name: 'andy'
}
function fn(a, b) {
    console.log(this);
    console.log(a + b);
};
fn.call(o, 1, 2);

// 应用:参数继承
function Father(uname, age, sex) {
    this.uname = uname;
    this.age = age;
    this.sex = sex;
}
function Son(uname, age, sex) {
    Father.call(this, uname, age, sex);
}
var son = new Son('hisunyh', 18, '男');
console.log(son);


// 2.apply()
// func.apply(thisArg, [argsArray])
// 1)调用函数 2)改变函数内this指向
// 应用: 利用 apply 借助于数学内置对象求数组最大值
var arr = [1, 66, 3, 99, 4];
var arr1 = ['red', 'pink'];
// var max = Math.max.apply(null, arr);
var max = Math.max.apply(Math, arr);
var min = Math.min.apply(Math, arr);
console.log(max, min);

// 3.bind()
// 1)不会原来调用函数 2)改变函数内this指向 3)返回原函数改变this后的新函数
var o = {
    name: 'andy'
};
function fn(a, b) {
    console.log(this);
    console.log(a + b);
};
var f = fn.bind(o, 1, 2);
f();
//demo
var btns = document.querySelectorAll('button');
for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {
        this.disabled = true;
        setTimeout(function() {
            this.disabled = false;
        }.bind(this), 2000);
    }
}
```



> catch参数省略
>
> 函数参数尾逗号
>
> 尾调用
>
> 箭头函数
>
> name属性
>
> length属性
>
> 严格模式限制
>
> 参数作用域
>
> 参数默认值

```javascript
// 参数默认值

// 1.参数变量是默认声明的，所以不能用let或const再次声明
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}


// 2.使用参数默认值时，函数不能有同名参数
// 不报错
function foo(x, x, y) {
  // ...
}
// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context


// 3.参数默认值是惰性求值的
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}
foo() // 100
x = 100;
foo() // 101

// 4.与解构赋值联用
function fetch(url, { body = '', method = 'GET', headers = {} }) {
  console.log(method);
}
fetch('http://example.com', {})
// "GET"
fetch('http://example.com')
// 报错, 第二个参数不能省略

// 双重默认值. 可以省略对象参数
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}
fetch('http://example.com')
// "GET"


// 4. 
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}
// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]
// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]
// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]
// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]
m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]


// 5. 参数默认值位置
// 非尾部参数设置默认值,实际上这个参数是没法省略的
// 例一
function f(x = 1, y) {
  return [x, y];
}
f() // [1, undefined]
f(2) // [2, undefined])
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}
f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```



```javascript
// 函数length属性, 返回没有指定默认值的参数的个数
// rest参数不会计入length属性
// 如果设置默认值的参数不是尾参数,后面的属性也不计入length属性
console.log((() => { }).length);				// 0
console.log(((...args) => { }).length);			// 0
console.log((x => { }).length);					// 1
console.log(((x = 1) => { }).length);			// 0
console.log(((x, y, z = 1) => { }).length);		// 2
console.log(((x, y = 1, z) => { }).length);		// 1
console.log(((x = 1, y, z) => { }).length);		// 0

```



```javascript
// 参数作用域

// 设置了参数默认值,函数声明初始化时,会形成单独的作用域,初始化结束后这个作用域就会结束
// 这种语法行为,不设置参数默认值时不会出现的

// demo1
let x = 1;
function f(x, y = x) {
  console.log(y);
}
f(3) // 3
f()  // undefined

// demo2
let x = 1;
function f(y = x) {
  let x = 2;
  console.log(y);
}
f() // 1

// demo3 暂时性死区
let x = 1;
function foo(x = x) {
}
foo() // ReferenceError: x is not defined

// demo4 参数默认值为函数
let foo = 'outer';
function bar(foo, func = () => foo) {
  console.log(func());
}
bar(); 				// undefined
bar('inner');		// inner

//demo 5
let foo = 'outer';
function bar(func = () => foo) {
  let foo = 'inner'
  console.log(func());
}
bar(); 				// outer

// demo6
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}
foo()				// 3
console.log(x);		// 1

// demo7
var x = 1;
function foo(x, y = function() { x = 2; }) {
  console.log(x);
  x = 3;
  console.log(x);  
  y();
  console.log(x);
}
foo()				// undefined	3	2
console.log(x);		// 1
```



```javascript
// 严格模式

// 如果函数参数使用了默认值/解构赋值/扩展运算符,那么函数内部不能显式设定为严格模式
// 原因:函数内部的严格模式,适用于函数体和函数参数,但是函数执行的时候先执行函数参数再执行函数体,这就有不合理的地方,函数体中才能知道函数参数是否应该以严格模式运行

// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
```



```javascript
// name属性

// 1.匿名函数
var f = function () {};
// ES5
f.name // ""
// ES6
f.name // "f"


// 2.具名函数
const bar = function baz() {};
// ES5
bar.name // "baz"
// ES6
bar.name // "baz"


// 3.构造函数	anonymous
(new Function).name 	// "anonymous"


// 4.bind	bound前缀
function foo() {};
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "

```



```javascript
// 箭头函数
// 1.函数体内的this对象,是函数定义时所在的对象,不是使用时所在的对象
// 2.不可以作为构造函数(即不能使用new)
// 3.不可以使用arguements对象,使用rest参数代替
// 4.不可以使用yield(不能用作Generator函数)

```



```javascript
// 尾调用优化

// 尾递归
```



```javascript
// es2019
// Function.prototype.toString()不仅返回函数代码本身,包括注释和空格
```



```javascript
// es2019
// catch参数省略
try {
  // ...
} catch {
  // ...
}
```

