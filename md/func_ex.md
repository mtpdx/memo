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

bar(); 
// bar('inner'); l
```

