### 1. promise 概念

- 特点:
  - 每次new 一个promise 都需要传递一个执行器,执行器是立即执行的;
  - 执行器函数中有两个参数:resolve, reject;
  - promise默认有三个状态: pendding, fulfilled(对应resolve), rejected(对应reject);
  - 只有pendding时可以改变状态,同时只能存在一种状态
  - 每个promise都有一个then方法
- 作用:
  - 解决并发问题(同步多个异步方法的执行结果)
  - 链式调用(解决多个回调嵌套问题)



### 2. promise实现

```javascript
// 简版
const PENDDING = 'pendding'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise{
	constructor(executor){
        this.status = PENDDING
        this.value = undefined
        this.reason = undefined
        // 可能一个promise 非链式多次调用then,存在多个回调
        this.onResolveCallback = []
        this.onRejectCallback = []
        let resolve = value => {
            if (this.status === PENDDING){
                this.value = value
                this.status = FULFILLED
                this.onResolveCallback.forEach(fn => fn())
            }
        }
        let reject = reason => {
             if (this.status === PENDDING){
                 this.reason = reason
                 this.status = REJECTED
                 this.onRejectCallback.forEach(fn => fn())
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
        if (this.status === PENDDING){
            this.onResolveCallback.push(() => {
                onFulfilled(this.value)
            })
            this.onRejectCallback.push(() => {
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
const PENDDING = 'pendding'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise{
	constructor(executor){
        this.status = PENDDING
        this.value = undefined
        this.reason = undefined
        // 可能一个promise 非链式多次调用then,存在多个回调
        this.onResolveCallback = []
        this.onRejectCallback = []
        let resolve = value => {
            if (this.status === PENDDING){
                this.value = value
                this.status = FULFILLED
                this.onResolveCallback.forEach(fn => fn())
            }
        }
        let reject = reason => {
             if (this.status === PENDDING){
                 this.reason = reason
                 this.status = REJECTED
                 this.onRejectCallback.forEach(fn => fn())
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
            if (this.status === PENDDING){
                this.onResolveCallback.push(() => {
                    // 确保promise2存在, onFulfilled不能在当前上下文中执行
                    // 异步代码会在同步代码执行后再执行,所以使用setTimeout
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
                
                this.onRejectCallback.push(() => {
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
const PENDDING = 'pendding'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise{
	constructor(executor){
        this.status = PENDDING
        this.value = undefined
        this.reason = undefined
        // 可能一个promise 非链式多次调用then,存在多个回调
        this.onResolveCallback = []
        this.onRejectCallback = []
        let resolve = value => {
            if (this.status === PENDDING){
                this.value = value
                this.status = FULFILLED
                this.onResolveCallback.forEach(fn => fn())
            }
        }
        let reject = reason => {
             if (this.status === PENDDING){
                 this.reason = reason
                 this.status = REJECTED
                 this.onRejectCallback.forEach(fn => fn())
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
            	onFulfilled(this.value)
            }
            if (this.status === REJECTED){
            	onRejected(this.reason)
            }
            // 有可能resolve/reject 在 then 之后执行
            if (this.status === PENDDING){
                this.onResolveCallback.push(() => {
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
                
                this.onRejectCallback.push(() => {                    
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
>
> 全部完成才算完成,如果一个失败就失败
>
> promises数组顺序执行
>
> 返回promise对象

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

> 有一个成功就成功 有一个失败就失败



### 5. Promise.finally 实现



### 6. Promise.try 实现