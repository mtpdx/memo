### 1. Proxy

> 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
>
> ```javascript
> var proxy = new Proxy(target, handler);
> ```

```javascript
// proxy 兼容性差
// 代理 我们可以创造一个代理 帮我们干某些事
let obj = {
    a:{a:2}
}
let handler = { // 只能代理当前这个对象 1层
    get(target,key){ // 有13中属性 symbol 11种
        // return target[key]
        if(typeof target[key] === 'object'){
            return new Proxy(target[key],handler); // 如果是对象 就返回这个对象的代理
        }
       return Reflect.get(target,key);
    },
    set(target,key,value){ // 反射属性
        // target[key] = value;
        if(key === 'length') return true;
        console.log('update');
        return  Reflect.set(target,key,value);
    }
}
let proxy = new Proxy(obj,handler)
proxy.a.a = 100
console.log(obj.a.a);
```



### 2. Reflect

> 提供拦截 JavaScript 操作的方法

`Reflect`对象提供以下静态函数，它们具有与[处理器对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler)方法相同的名称。这些方法中的一些与 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 上的对应方法相同。

- [`Reflect.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply)

  对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 [`Function.prototype.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 功能类似。

  ```
  
  ```

  

- [`Reflect.construct()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct)

  对构造函数进行 [`new` ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)操作，相当于执行 `new target(...args)`。

- [`Reflect.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty)

  和 [`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 类似。

- [`Reflect.deleteProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty)

  作为函数的[`delete`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete)操作符，相当于执行 `delete target[name]`。

- [`Reflect.get()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get)

  获取对象身上某个属性的值，类似于 `target[name]。`

- [`Reflect.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor)

  类似于 [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)。

- [`Reflect.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getPrototypeOf)

  类似于 [`Object.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)。

- [`Reflect.has()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has)

  判断一个对象是否存在某个属性，和 [`in` 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 的功能完全相同。

- [`Reflect.isExtensible()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/isExtensible)

  类似于 [`Object.isExtensible()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible).

- [`Reflect.ownKeys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)

  返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 [`Object.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), 但不会受`enumerable影响`).

- [`Reflect.preventExtensions()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/preventExtensions)

  类似于 [`Object.preventExtensions()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)。返回一个[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)。

- [`Reflect.set()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set)

  将值分配给属性的函数。返回一个[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)，如果更新成功，则返回`true`。

- [`Reflect.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/setPrototypeOf)

  类似于 [`Object.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)。



