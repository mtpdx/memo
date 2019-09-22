### 1.  AOP

> Aspect Oriented Programming 

```javascript
// 闭包+apply 实现
function count() {
    let total = 0
    for (let index = 0; index < 3000000000; index++) {
        total += index;
    }
    console.log(...arguments)
}

function logging(func) {
    return function() {
        console.log('开始时间:' + new Date()) 
        let fc = func.apply(this, arguments)
        console.log('结束时间:' + new Date())
        return fc
    }
}

var count = logging(count)
count(123, 456)
```



```javascript
// 箭头函数 实现
Function.prototype.logging = function (beforeFn, afterFn) {
    return (...args) => {
        beforeFn()
        this(...args)
        afterFn()
    }
}

var count = count.logging(() => {
    console.log('开始时间:' + new Date())
}, () => {
    console.log('结束时间:' + new Date())
})
count(123, 456)
```



### 2.  Transcation 

> 事务



```javascript
const perform = (mainmethod,wrappers)=>{
    wrappers.forEach(wrap=>{
        wrap.initilizae();
    })
    mainmethod();
    wrappers.forEach(wrap=>{
        wrap.close();
    })
}
perform(()=>{
    console.log('main')
},[
    { // warpper
        initilizae(){
            console.log('init 1')
        },
        close(){
            console.log('close 1')
        }
    },
    { // warpper
        initilizae(){
            console.log('init 2')
        },
        close(){
            console.log('close 2')
        }
    }
])
```



### 3. Currying

[柯里化](https://www.wikizero.com/zh/%E6%9F%AF%E9%87%8C%E5%8C%96)

```javascript
// 实现数字相加
// function add(a, b, c) {
//   return a + b + c
// }


// 柯里化版本
function add(a) {
  return (b) => {
    return (c) => {
      return a + b + c
    }
  }
}
console.log(add(1)(2)(3));
```

> 柯里化应用: 参数复用/提前确认/延迟运行

```javascript
// 1.参数复用 demo
// 1.1 正则验证
function check(reg, content){
	return reg.test(content)
}
check(/\d+/g, 'test')       //false
check(/[a-z]+/g, 'test')    //true

// Carrying
function curryCheck(reg){
    return (content) => {
        return reg.test(content)
    }
}
// curryCheck(reg)(txt)
let hasNumber = curryCheck(/\d+/g)
let hasLetter = curryCheck(/[a-z]+/g)
hasNumber('asdf')			// false
hasNumber('as1df')			// true
hasLetter('2133')			// false

// 1.2 判断类型
function curryCheck(type){
    return (content) => {
        return Object.prototype.toString.call(content) === `[Object ${type}]`
    }
}
let types = ['Function', 'Object', 'Array', 'Boolean', 'Number', 'Undefined', 'Null']
let utils = {}
types.forEach(type => {
    utils[`is${type}`] = curryCheck(type)
})
isFunction(()=>1)			// true
isFunction(class A{})		// true
isObject({})				// true
isArray([])					// true
isBoolean(true)				// true
isNumber(1)					// true
isUndefined(undefined)		// true
isNull(null)				// true

```



```javascript
// 2.提前确认 demo
// dom事件执行之前判断兼容性
var on = function(element, event, handler) {
    if (document.addEventListener) {
        if (element && event && handler) {
            element.addEventListener(event, handler, false);
        }
    } else {
        if (element && event && handler) {
            element.attachEvent('on' + event, handler);
        }
    }
}

var on = (function() {
    if (document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
        };
    }
})();
```



```javascript
// 3.延迟执行
// bind实现原理
Function.prototype.bind = function(context){
    var _this = this
    var args = Array.prototype.slice.call(arguments, 1)
    return function(){
        return _this.apply(context, args)
    }
}

// Function.prototype.bind = context =>{
//   return (...args) => this.apply(context, args.slice(1))
// }
```



```javascript
// 经典面试题
// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;
// 思路:收集并利用闭包特性保存参数+函数隐式转换计算

function add() {
  let arr = [].slice.call(arguments)

  let adder = (...args) => {
    arr.push(...args)
    return adder
  }

  adder.toString = () => {
    return arr.reduce((x, y) => x + y)
  }

  return adder
}
let res = add(1, 2, 3)(4)(5, 6)(7)(8, 9)
console.log(res == 45);			// true
```



> 函数隐式转换

```javascript
// 当我们没有重新定义toString与valueOf时，函数的隐式转换会调用默认的toString方法，它会将函数的定义内容作为字符串返回。而当我们主动定义了toString/vauleOf方法时，那么隐式转换的返回结果则由我们自己控制了。其中valueOf的优先级会toString高一点。

let fn1 = () => 2
let fn2 = () => 2
let fn3 = () => 2

fn2.toString = () => 3

fn3.toString = () => 4
fn3.toString = () => 5

console.log(fn1 + 10);				// () => 210
console.log(fn2 + 10);				// 13
console.log(fn3 + 10);				// 15
```



### 4. lodash after

> after可以生成新的函数 等待函数执行次数达到我的预期时执行

```javascript
const l_after = (times, fn) => ()=> --times === 0 && fn();
let fp = l_after(3, () => {
  console.log("call method");
});
fp();
fp();
fp();
```



### 5. Concurrence

> 计数器解决并发问题

```javascript
// 分别从两个文件读取数据, 都完成后打印结果

const fs = require('fs')
let user = {}
const l_after = (times, fn) => () => --times === 0 && fn();
let fp = l_after(2, () => console.log(user))
fs.readFile('name.txt', 'utf-8', (err, data) => {
    user['name'] = data
    fp()
})
fs.readFile('age.txt', 'utf-8', (err, data) => {
    user['age'] = data
    fp()
})
```



### 6. Publish/Subscribe

> 发布订阅模式(第三方参与)
>
> eventBus

```javascript
// events模块 vue $on $once $off

const fs = require('fs')
let user = {}
let event = {
    arr : [],
    on(fn){
        this.arr.push(fn)
    },
    emit(){
        this.arr.forEach(fn => fn())
    }
}

event.on(() => console.log('subscribe 1'))
event.on(() => {
    console.log('subscribe 2')
    Object.keys(user).length === 2 && console.log(user)
})

fs.readFile('name.txt', 'utf-8', (err, data) => {
    user['name'] = data
    // publish
    event.emit()
})
fs.readFile('age.txt', 'utf-8', (err, data) => {
    user['age'] = data
    event.emit()
})
```



### 7. Observer

> 观察者模式

```javascript
// vue watcher

class Observable{
    constructor(){
        this.observers = []
        this.state = 'happy'
    }
    attach(observer){
        this.observers.push(observer)
    }
    setState(s){
        this.state = s
        this.observers.forEach(observer => observer.onStateChanged(s))
    }
}

class Observer{
    constructor(name){
        this.name = name
    }    
    onStateChanged(s){
        console.log(`${this.name} : ${s}`)
    }
}

let observable = new Observable()
let observer1 = new Observer('observer a')
let observer2 = new Observer('observer b')
observable.attach(observer1)
observable.attach(observer2)
observable.setState('sad')
observable.setState('happy')
```

