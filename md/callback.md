### 1.AOP

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



### 2.transcation

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



### 3.lodash after

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

