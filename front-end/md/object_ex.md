

> Object.defineProperty
>
> Object.getOwnPropertyDescriptor
>
> iterate object properties

### 1. Object initializer

```javascript
// 1.1 literal 
var literal_obj = {}


// 1.2 new Object() / Object.create()
var new_obj = new Object()
new_obj.name = 'new obj'
var c_obj = Object.create(new_obj)


// 1.3 constructor
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
    this.sing = function() {
        console.log('我会唱歌');

    }
}
var ldh = new Star('刘德华', 18);
// 构造函数中的属性和方法我们称为成员, 成员可以添加
// 实例成员就是构造函数内部通过this添加的成员 uname age sing 就是实例成员
// 实例成员只能通过实例化的对象来访问
console.log(ldh.uname);
ldh.sing();
// console.log(Star.uname); // 不可以通过构造函数来访问实例成员
// 静态成员 在构造函数本身上添加的成员  sex 就是静态成员
Star.sex = '男';
// 静态成员只能通过构造函数来访问
console.log(Star.sex);  // '男'
console.log(ldh.sex);   // undefined   不能通过对象来访问
var zxy = new Star('张学友', 19);
console.log(ldh);
ldh.sing();
zxy.sing();

// 这种方式的创建的多个对象,实例成员方法不一样
// function属于复杂数据类型,会开辟多个内存空间
console.log(ldh.sing === zxy.sing);  // False

// 一般情况下,我们的公共属性定义到构造函数里面, 公共的方法我们放到原型对象身上
Star.prototype.eat = function(){
    console.log('eat food');
    
}
// 对象身上系统自己添加一个 __proto__ 属性 指向我们构造函数的原型对象 prototype
// 所以可以通过对象调用原型对象里的方法
ldh.eat();
zxy.eat();
console.log(ldh.eat === zxy.eat);  // True
console.log(ldh.__proto__ === Star.prototype); // True
// 方法的查找规则: 首先先看ldh 对象身上是否有 eat 方法,如果有就执行这个对象上的eat
// 如果没有 eat 这个方法,因为有__proto__ 的存在,就去构造函数原型对象prototype身上去查找eat这个方法
// 很多情况下,我们需要手动的利用constructor 这个属性指回 原来的构造函数
Star.prototype = {
    // 如果我们修改了原来的原型对象,给原型对象赋值的是一个对象,则必须手动的利用constructor指回原来的构造函数
    constructor: Star,
    view: function() {
        console.log('我会view');
    },
    movie: function() {
        console.log('我会演电影');
    }
}
var zjl = new Star('周杰伦', 18);
console.log(Star.prototype);
console.log(zjl.__proto__);
console.log(Star.prototype.constructor);
console.log(zjl.__proto__.constructor);
zjl.view();
// zjl.eat();
zjl.sing();
```



### 2. 原型链

```javascript
// 1. 只要是对象就有__proto__ 原型, 指向原型对象
console.log(Star.prototype);
console.log(Star.prototype.__proto__ === Object.prototype);
// 2.我们Star原型对象里面的__proto__原型指向的是 Object.prototype
console.log(Object.prototype.__proto__);
// 3. 我们Object.prototype原型对象里面的__proto__原型  指向为 null

// 1. 在构造函数中里面的this指向的是 对象实例
// 2. 原型对象函数里面的this指向的是 实例对象
```

```javascript
// 原型对象的应用 
// 1. 扩展内置对象方法
Array.prototype.sum = function() {
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        sum += this[i];
    }
    return sum;
};
var arr = [1, 2, 3];
console.log(arr.sum());			// 6
console.log(Array.prototype);	// [ sum: [Function] ]
var arr1 = new Array(11, 22, 33);
console.log(arr1.sum());		// 66


// 2. 继承
var Person = function(name) {
  this.name = name;
  this.canTalk = true;
};

Person.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name);
  }
};

var Employee = function(name, song) {
  Person.call(this, name); // 属性继承
  this.song = song;
};

// 借用原型对象继承方法
// Employee.prototype = Object.create(Person.prototype);
// Employee.prototype.constructor = Employee; 
Employee.prototype = Object.create(Person.prototype, {constructor: {value: Employee}});
//If you don't set Object.prototype.constructor to Employee, 
//it will take prototype.constructor of Person (parent). 
//To avoid that, we set the prototype.constructor to Employee (child).

Employee.prototype.sing = function() {
  if (this.canTalk) {
    console.log(this.name + ' sing ' + this.song);
  }
};

var bob = new Employee('Bob', 'something just like this');
bob.greet();	// Hi, I am Bob
bob.sing();		// Bob sing something just like this
```



### 3.  Object Properties

> 

### 4. Object Methods

- [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

  > The **Object.assign()** method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
  >
  > ```
  > Object.assign(target, ...sources)
  > ```

  ```javascript
  const target = { a: 1, b: 2 };
  const source = { b: 4, c: 5 };
  const returnedTarget = Object.assign(target, source);
  console.log(target);
  // expected output: Object { a: 1, b: 4, c: 5 }
  console.log(source);
  // expected output: Object { b: 4, c: 5 }
  console.log(returnedTarget);
  // expected output: Object { a: 1, b: 4, c: 5 }
  ```

  

- [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

  > The `Object.create() `method creates a new object, using an existing object as the prototype of the newly created object.
  >
  > ```javascript
  > Object.create(proto, [propertiesObject])
  > 
  > // create 原理
  > function create(parentPrototype) {
  >     function Fn() {}
  >     Fn.prototype = parentPrototype;
  >     return new Fn()
  > }
  > ```
> propertyObj : {
> 	value : 'property value',
> 	writable: false,		// default false, 是否可修改
> 	configurable: false,	// default false, 是否可删除
> 	enumerable: false		// default false, 是否可迭代
> }
>
> ```
> 
> ```

  ```javascript
  var o;
  
  // create an object with null as prototype
  o = Object.create(null);
  
  
  o = {};
  // is equivalent to:
  o = Object.create(Object.prototype);
  
  // using propertiesObject arguement with Object.create()
  o = Object.create(Object.prototype, {
    // foo is a regular 'value property'
    foo: {
      writable: true,
      configurable: true,
      value: 'hello'
    },
    // bar is a getter-and-setter (accessor) property
    bar: {
      configurable: false,
      get: function() { return 10; },
      set: function(value) {
        console.log('Setting `o.bar` to', value);
      }
  /* with ES2015 Accessors our code can look like this
    get() { return 10; },
      set(value) {
        console.log('Setting `o.bar` to', value);
      } */
    }
  });
  ```

  ```javascript
  var o = Object.create(null)
  Object.setPrototypeOf(o, Object.prototype)
  console.log(o.valueOf())
  console.log(o.constructor)
  // is equivalent to:
  o = Object.create(Object.prototype)
  
  ```



- [Object.defineProperties()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

  > The `Object.defineProperties()` method defines new or modifies existing properties directly on an object, returning the object.
  >
  > ```
  > Object.defineProperties(obj, props)
  > ```

  

  ```javascript
  const object1 = {};
  
  Object.defineProperties(object1, {
    property1: {
      value: 42,
      writable: true
    },
    property2: {
        get(){
            
        },
        set(){
            
        }
    }
  });
  
  console.log(object1.property1);
  // expected output: 42
  ```

  

- [Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

  > The static method `Object.defineProperty()` defines a new property directly on an object, or modifies an existing property on an object, and returns the object.
  >
  > ```
  > Object.defineProperty(obj, prop, descriptor)
  > ```

  

  ```javascript
  const object1 = {};
  
  Object.defineProperty(object1, 'property1', {
    value: 42,
    writable: false
  });
  
  object1.property1 = 77;
  // throws an error in strict mode
  
  console.log(object1.property1);
  // expected output: 42
  ```

  

- [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

  > The `Object.entries()` method returns an array of a given object's own enumerable string-keyed property `[key, value]` pairs, in the same order as that provided by a [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) loop (the difference being that a for-in loop enumerates properties in the prototype chain as well).

  

  ```javascript
  const object1 = {
    a: 'somestring',
    b: 42
  };
  
  for (let [key, value] of Object.entries(object1)) {
    console.log(`${key}: ${value}`);
  }
  
  // expected output:
  // "a: somestring"
  // "b: 42"
  
  // order is not guaranteed
  
  const obj = { foo: 'bar', baz: 42 };
  console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
  ```

  

- [Object.fromEntries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)

  > The `Object.fromEntries()` method transforms a list of key-value pairs into an object.

  

  ```javascript
  const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
  const obj = Object.fromEntries(map);
  console.log(obj); // { foo: "bar", baz: 42 }
  ```

  

- [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

  ```javascript
  // deep freeze
  function deepFreeze(obj){
      let propNames  = Object.getOwnPropertyNames(obj)
      propNames.forEach(name => {
          let prop = obj[name]
          if (prop !== null && typeof prop === 'object'){
              deeFreeze(prop)
          }
      })
      return Object.freeze(obj)
  }
  ```

  

- [Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)

  ```javascript
  var o, d;
  
  o = { get foo() { return 17; } };
  d = Object.getOwnPropertyDescriptor(o, "foo");
  // d {
  //   configurable: true,
  //   enumerable: true,
  //   get: /*the getter function*/,
  //   set: undefined
  // }
  ```

  

- [Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)

  ```javascript
  // shallow clone 
  Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
  ```

  

  

- Object.prototype

  ```javascript
  // 对象自身属性中是否具有指定的属性
  // Object.prototype.hasOwnProperty()
  
  
  // 返回一个布尔值,测试一个对象是否存在于另一个对象的原型链上
  // Object.prototype.isPrototypeOf()
  // ?? 和instanceof区别
  function Foo() {}
  function Bar() {}
  function Baz() {}
  Bar.prototype = Object.create(Foo.prototype);
  Baz.prototype = Object.create(Bar.prototype);
  var baz = new Baz();
  console.log(Baz.prototype.isPrototypeOf(baz)); // true
  console.log(Bar.prototype.isPrototypeOf(baz)); // true
  console.log(Foo.prototype.isPrototypeOf(baz)); // true
  console.log(Object.prototype.isPrototypeOf(baz)); // true
  
  // 返回一个布尔值，表示指定的属性是否可枚举。
  // Object.prototype.propertyIsEnumerable()
  var a = ['is enumerable'];
  a.propertyIsEnumerable(0);          // 返回 true
  a.propertyIsEnumerable('length');   // 返回 false
  
  
  // Object.prototype.toLocaleString()
  
  // Object.prototype.toString()
  
  // 返回指定对象的原始值
  // Object.prototype.valueOf()
  
  ```
  
  

> iterate object properties

```javascript
for ... in
// for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）
    
Object.getOwnPropertyNames()
// Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

Object.getOwnPropertySymbols() 
// Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

Object.keys()
// Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名

Reflect.ownKeys()
// Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

```



```
Object.getPrototypeOf()         
//  returns the prototype of the specified object.

Object.setPrototypeOf() 		
//  set the prototype of the specified object.
```



```
Object.freeze()

Object.preventExtensions()

Object.seal()

Object.isFrozen()

Object.isExtensiable()

Object.isSealed()
```



```javascript
// Object.is()    Same-value equality
// 比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致
// 不同点 
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

