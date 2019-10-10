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

