### 1. promise 概念

- 特点:
  - 每次new 一个promise 都需要传递一个执行器,执行器是立即执行的;
  - 执行器函数中有两个参数:resolve, reject;
  - promise默认有三个状态: PENDING, fulfilled(对应resolve), rejected(对应reject);
  - 只有PENDING时可以改变状态,同时只能存在一种状态
  - 每个promise都有一个then方法
- 作用:
  - 解决并发问题(promise.all  同步多个异步方法的执行结果)
  - 链式调用(解决多个回调嵌套问题)
- 缺点:
  - promise不能中断  (fetch发送请求不能中断  axios可以中断)

### 2. promise实现

```javascript
// 简版
const PENDING = 'PENDING'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise{
	constructor(executor){
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        // 可能一个promise 非链式多次调用then,存在多个回调
        this.onResolveCallbacks = []
        this.onRejectCallbacks = []
        let resolve = value => {
            if (this.status === PENDING){
                this.value = value
                this.status = FULFILLED
                this.onResolveCallbacks.forEach(fn => fn())
            }
        }
        let reject = reason => {
             if (this.status === PENDING){
                 this.reason = reason
                 this.status = REJECTED
                 this.onRejectCallbacks.forEach(fn => fn())
            }
        }
        try{
            executor(resolve, reject)
        } catch(e){
            reject(e)
        }
    }
    
    then(onFulfilled, onRejected){
        if (this.status === FULFILLED){
            onFulfilled(this.value)
        }
        if (this.status === REJECTED){
            onRejected(this.reason)
        }
        // 有可能resolve/reject 在 then 之后执行
        if (this.status === PENDING){
            this.onResolveCallbacks.push(() => {
                onFulfilled(this.value)
            })
            this.onRejectCallbacks.push(() => {
                onRejected(this.reason)
            })
        }
    }
}

module.exports = Promise
```

> 要满足then可以链式调用, then的返回结果必须是promise对象
>
> then的参数是可选参数,如果没传或者不是函数,创建默认函数

```javascript
const PENDING = 'PENDING'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise{
	constructor(executor){
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        // 可能一个promise 非链式多次调用then,存在多个回调
        this.onResolveCallbacks = []
        this.onRejectCallbacks = []
        let resolve = value => {
            if (this.status === PENDING){
                this.value = value
                this.status = FULFILLED
                this.onResolveCallbacks.forEach(fn => fn())
            }
        }
        let reject = reason => {
             if (this.status === PENDING){
                 this.reason = reason
                 this.status = REJECTED
                 this.onRejectCallbacks.forEach(fn => fn())
            }
        }
        try{
            executor(resolve, reject)
        } catch(e){
            reject(e)
        }
    }
    
    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected: err => {throw err}
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED){
            	onFulfilled(this.value)
            }
            if (this.status === REJECTED){
            	onRejected(this.reason)
            }
            // 有可能resolve/reject 在 then 之后执行
            if (this.status === PENDING){
                this.onResolveCallbacks.push(() => {
                    // 确保promise2存在, onFulfilled不能在当前上下文中执行
                    // 异步代码会在同步代码执行后再执行,所以使用setTimeout模拟异步调用
                    setTimeout(() => {
                        // 获取上一次的状态, 来决定promise2的结果
                        try{
                            let x = onFulfilled(this.value)
                            // x不能是自己
                            if (promise2 === x){
                                return reject(new TypeError(`Chaining cycle detected for promise #<Promise>`))
                            }
                            // 判断x的类型
                            if (typeof x === 'function' || (typeof x === 'object' && x !== null)){
                                // 可能是promise
                                try{
                                    // 看有无then方法
                                    let then = x.then
                                    if (typeof then === 'function'){
                                        // x是promise, x.then(()=>{},()=>{})
                                        then.call(x, y => {
                                            // y可能是promise, 递归判断
                                            // todo ......
                                        }, r => {
                                            reject(r)
                                        })
                                    }else{
                                        // 常量直接抛出
                                        resolve(x)
                                    }
                                }catch(e){
                                    reject(e)
                                }
                            }else {
                                // 不是promise
                                resolve(x)
                            }
                       	} catch(e){
                        	reject(e)
                       	}
                    })
                })
                
                this.onRejectCallbacks.push(() => {
                    onRejected(this.reason)
                })
            }
        })
        return promise2       
    }
    
    // catch 没resolve返回
    catch(errorCallback){
        retuen this.then(null, errorCallback)
    }
    
    // 创建成功的Promise
    static resolve(value){
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }
    // 创建失败的Promise
    static reject(reason){
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    } 
}

module.exports = Promise
```

> 递归封装
>
> 

```javascript
const PENDING = 'PENDING'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise{
	constructor(executor){
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        // 可能一个promise 非链式多次调用then,存在多个回调
        this.onResolveCallbacks = []
        this.onRejectCallbacks = []
        let resolve = value => {
            if (this.status === PENDING){
                this.value = value
                this.status = FULFILLED
                this.onResolveCallbacks.forEach(fn => fn())
            }
        }
        let reject = reason => {
             if (this.status === PENDING){
                 this.reason = reason
                 this.status = REJECTED
                 this.onRejectCallbacks.forEach(fn => fn())
            }
        }
        try{
            executor(resolve, reject)
        } catch(e){
            reject(e)
        }
    }
    
    resolvePromise(promise2, x , resolve, reject){
        // x不能是自己
        if (promise2 === x){
            return reject(new TypeError(`Chaining cycle detected for promise #<Promise>`))
        }
        // 判断x的类型
        if (typeof x === 'function' || (typeof x === 'object' && x !== null)){
            // 可能是promise
            let called	// Promise可能是其他来源的,不能保证resolve/reject只调用一次
            try{
                // 看有无then方法
                let then = x.then
                if (typeof then === 'function'){
                    // x是promise, x.then(()=>{},()=>{})
                    then.call(x, y => {
                        if (called) return	// 防止多次调用
                        called = true
                        // y可能是promise, 递归判断
                        resolvePromise(promise2, y , resolve, reject)
                    }, r => {
                        if (called) return	// 防止多次调用
                        called = true
                        reject(r)
                    })
                }else{
                    // 常量直接抛出
                    resolve(x)
                }
            }catch(e){
                if (called) return	// 防止多次调用
                called = true
                reject(e)
            }
        }else {
            // 不是promise
            resolve(x)
        }
    }
    
    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected: err => {throw err}
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED){
            	// onFulfilled(this.value)
                // x 是当前then 成功或者失败函数的返回结果
  				// x是不是一个普通值如果普通值 把值直接传递到下一个then中
  				// x是一个promise ？ 我需要采用这个x的状态
  				// 如果 执行函数出错，直接调用promise2的失败
                setTimeout(()=>{
                    try{
                    	let x = onFulfilled(this.value)
                     	resolvePromise(promise2, x , resolve, reject)
                	}catch(e){
                    	reject(e)
                	}
                })
            }
            if (this.status === REJECTED){
            	// onRejected(this.reason)
                // 修改执行上下文 不止可以用setTimeout()
                setTimeout(()=>{
                    try{
                    	let x = onRejected(this.reason)
                     	resolvePromise(promise2, x , resolve, reject)
                	}catch(e){
                    	reject(e)
                	}
                })
            }
            // 有可能resolve/reject 在 then 之后执行
            if (this.status === PENDING){
                this.onResolveCallbacks.push(() => {
                    // 确保promise2存在, onFulfilled不能在当前上下文中执行
                    // 异步代码会在同步代码执行后再执行,所以使用setTimeout
                    setTimeout(() => {
                        // 获取上一次的状态, 来决定promise2的结果
                        try{
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x , resolve, reject)
                       	} catch(e){
                        	reject(e)
                       	}
                    })
                })
                
                this.onRejectCallbacks.push(() => {                    
                    setTimeout(() => {
                        try{
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x , resolve, reject)
                       	} catch(e){
                        	reject(e)
                       	}
                    })
                })
            }
        })
        return promise2
        
    }
}

module.exports = Promise
```



### 3. Promise.all 实现

> 处理多个异步并发问题

`Promise.all(iterable)` 方法返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 实例，此实例在 `iterable` 参数内所有的 `promise` 都“完成（resolved）”或参数中不包含 `promise` 时回调完成（resolve）；如果参数中  `promise` 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 `promise` 的结果

```javascript
const isPromise = val => {
    if (typeof val === 'function' || (typeof val === 'object' && val !== null)){
        return typeof val.then === 'function'
    }
    return false
}

Promise.all = function(promises){ 
    return new Promise((resolve, reject) => {
        let arr = []
    	let i = 0
        for(let j = 0; j < promises.length; j++){
            let cur = promises[j]
            // 判断cur是不是promise
            if (isPromise(cur)){
                cur.then(data => {
                    arr[j] = data
                    if (++i === promises.length){
                        resolve(arr)
                    }
                }, reject)
            }else{
                arr[j] = cur
                if (++i === promises.length){
                    resolve(arr)
                }
            }
        }
    })
}
```



### 4. Promise.race 实现

**Promise.race(iterable)** 方法返回一个 `promise`，一旦迭代器中的某个`promise`解决或拒绝，返回的 `promise`就会解决或拒绝。

```javascript
const isPromise = v => {
    if(typeof v === 'function' || (typeof v === 'object' && v !== null)){
        return typeof v.then === 'function'
    }
    return false
}
Promise.race = promises => new Promise((resolve, reject) => {
    for(let i = 0; i < promises.length; i++){
        let cur = promises[i]
        if(isPromise(cur)){
            cur.then(resolve, reject)
        }else{
            resolve(cur)
        }
    }
})
```



### 5. Promise.finally 实现

> 无论最终结果如何都会执行

```javascript
class Promise{
	constructor(){
		// ...
	}
    
    then(){
        // ...
    }
    
    finally(fn){
        return this.then(v => {
            fn()
            return v
        }, r => {
            fn()
            return r
        })
    }
    
}
```

```javascript
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
      value  => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    );
};
```



### 6. Promise.try 实现

> Promise.try(function() fn) -> Promise
>
> Start the chain of promises with `Promise.try`. Any synchronous exceptions will be turned into rejections on the returned promise.

```javascript
class Promise{
	constructor(){
		// ...
	}
    
    then(){
        // ...
    }
    
    try(fn){
        try{
        	fn()    
        }catch(e){
            
        }
        return this.then(v => {
            fn()
            return v
        }, r => {
            fn()
            return r
        })
    }
    
}
```

### 7. Promise.defer





### 8. 自定义Promise测试

> sudo npm install promises-aplus-tests -g

```javascript
Promise.defer = Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
```

