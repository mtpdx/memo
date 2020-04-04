### 1.es5

> es5没有类.只有构造函数,可以用es5的构造函数模拟es6的类

```javascript
// 模拟类的创建
// 构造函数不同的调用方式 this 的指向不同
// 使用defineProperty, 相比Animal.prototype.say = function(){}这种方式的好处是,可以控制属性不可枚举
function define(target, protoProperties) {
  for (let i = 0; i < protoProperties.length; i++) {
    let property = protoProperties[i];
    Object.defineProperty(target, property.key, {
      configurable: true,
      enumerable: false, // 不可枚举的
      ...property
    });
  }
}
function _createClass(Constructor, protoProperties, staticProperties) {
  if (Array.isArray(protoProperties)) {
    define(Constructor.prototype, protoProperties)
  }
  if (Array.isArray(staticProperties)) { // 定义静态的方法
    define(Constructor, staticProperties)
  }
}

var Animal = (function () {
  function Animal() {
    if (!(this instanceof Animal)) {
      throw new Error("not new");
    }
    this.name = "熊猫";
  }
  _createClass(
    Animal,
    [
      // 公共方法， babel编译出来
      {
        key: "say",
        value: function () {
          console.log("say");
        }
      },
      {
        key: "eat",
        value: function () {
          console.log("eat");
        }
      }
    ],
    [ // 描述类上的属性 或者方法
      {
        key: "a",
        value: function () {
          return 123;
        }
      },
      {
        key: "b",
        value: 123
      }
    ]
  );

  return Animal;
})();
console.log(Animal.a(), Animal.b);
```



```javascript
// 模拟类的继承
function Animal() {
    this.name = '动物' // 实例属性 
}
Animal.prototype.say = function () {
    console.log('说话')
}

// 继承实例属性
function Tiger() {
    Animal.call(this); // 调用父类构造函数改变this指向
}

// Tiger.prototype = Animal.prototype; 	// 混合

// 继承公共属性
// 1)
// Tiger.prototype.__proto__ = Animal.prototype  IE不支持直接操作__proto__
Object.setPrototypeof(Tiger.prototype, Animal.prototype)

// 2) Object.create方法实现继承公共属性
Tiger.prototype = Object.create(Animal.prototype,{constructor:{value:Tiger}});
let tiger = new Tiger;
console.log(tiger.name);

```



### 2.es6

```javascript
class Animal {
    constructor() {
        this.name = '熊猫'
    }
    // Animal.a = 123;
    // 静态属性
    static get a() { // 属性访问器 只能类用
        return this.flag;
    }
    static set a(newVal) { // 属性访问器
        this.flag = newVal
    }
    // set a(newVal){ }
    // Animal.prototype.a = 456
    get a() { // 原型上的属性 只能实例用
        return 456;
    }
    say() {
    }
    eat() {
    }
}
Animal.flag = 'zzz';
Animal.a = 'hello';
console.log(Animal.a)
```



```javascript
class Animal{
    constructor(name) {
        this.name = name;
    }
    static a(){
        return 100
    }
    say(){
        console.log('say')
    }
}
// 不能被实例化的类就是抽象类
// call + Object.create  __proto__
class Tiger extends Animal{
    constructor(name) {
        super(name); // Animal.call(this)
    }
    static get a(){ // Object.defineProperty简写
       // 这里的super ？ 
    }
    say(){ 
        // 子类重写父类方法

        // super是父类的原型
        super.say(); // Animal.prototype
    }
    static a(){ // 静态方法中的super指向的是父类
        return super.a()
    }
}
let tiger = new Tiger('老虎');
// console.log(tiger.a)
```



```javascript
// 抽象类 可以被继承 但是不能被new
class Animal{
    constructor(name) {
        this.name = name;
        // 类的实例化检查
        if(new.target === Animal){
            throw new Error('not new')
        }
    }
}
```



```javascript
class Animal {
    // static a = 1; // 静态属性 es7语法 给类增加一个属性 a = 1
    a = 1 // 不是给原型上增加a 
	// 等价于
	constructor(){
        this.a = 1
    }

    // static get a(){ // 给原型添加的
    //     return 1
    // }
}
let animal = new Animal;
// 如何查看一个属性是实例上的还是原型上的
console.log(animal.hasOwnProperty('a'));
```



```javascript
// 装饰器
// 1) 装饰类
@log1(1)
@log2(2)
class Animal {

}
let animal = new Animal;

function log1(target) { // 如果写在类的上面 ，第一个参数就是这个类
    console.log('3')
   return function () {
        console.log('1')
   }
}
function log2(target) {
    console.log(4);
    return function () {
        console.log('2')
    }
}
// 3 4 2 1

// 2) 装饰类中属性和方法
class Animal {
    @readonly a = 1 
    @before say() {
        console.log('say')
    }
}
let animal = new Animal;
animal.say();

function readonly(proto, key, descriptor) {
    descriptor.writable = false;
}
function before(proto, key, descriptor) {
    let old = descriptor.value;
    descriptor.value = function () {
        console.log('xxx');
        old();
    }
}

```

