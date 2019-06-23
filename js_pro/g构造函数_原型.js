// 1. 利用 new Object() 创建对象

var obj1 = new Object();

// 2. 利用 对象字面量创建对象

var obj2 = {};

// 3. 利用构造函数创建对象
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
    this.sing = function() {
        console.log('我会唱歌');

    }
}

var ldh = new Star('刘德华', 18);
// 构造函数中的属性和方法我们称为成员, 成员可以添加
// 1.实例成员就是构造函数内部通过this添加的成员 uname age sing 就是实例成员
// 实例成员只能通过实例化的对象来访问
console.log(ldh.uname);
ldh.sing();
// console.log(Star.uname); // 不可以通过构造函数来访问实例成员
// 2. 静态成员 在构造函数本身上添加的成员  sex 就是静态成员
Star.sex = '男';
// 静态成员只能通过构造函数来访问
console.log(Star.sex);
console.log(ldh.sex); // 不能通过对象来访问
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

// 原型链
 // 1. 只要是对象就有__proto__ 原型, 指向原型对象
 console.log(Star.prototype);
 console.log(Star.prototype.__proto__ === Object.prototype);
 // 2.我们Star原型对象里面的__proto__原型指向的是 Object.prototype
 console.log(Object.prototype.__proto__);
 // 3. 我们Object.prototype原型对象里面的__proto__原型  指向为 null


  // 1. 在构造函数中里面的this指向的是 对象实例
  // 2. 原型对象函数里面的this指向的是 实例对象


// 原型对象的应用 扩展内置对象方法
Array.prototype.sum = function() {
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        sum += this[i];
    }
    return sum;
};

// Array.prototype = {
//     constructor: Array,
//     sum: function() {
//         var sum = 0;
//         for (var i = 0; i < this.length; i++) {
//             sum += this[i];
//         }
//         return sum;
//     }
// }
var arr = [1, 2, 3];
console.log(arr.sum());
console.log(Array.prototype);
var arr1 = new Array(11, 22, 33);
console.log(arr1.sum());


// 借用父构造函数继承属性
// 1. 父构造函数
function Father(uname, age) {
    // this 指向父构造函数的对象实例
    this.uname = uname;
    this.age = age;
}
Father.prototype.money = function() {
    console.log(100000);

};
// 2 .子构造函数 
function Son(uname, age, score) {
    // this 指向子构造函数的对象实例
    Father.call(this, uname, age);
    this.score = score;
}
// Son.prototype = Father.prototype;  这样直接赋值会有问题,如果修改了子原型对象,父原型对象也会跟着一起变化
Son.prototype = new Father();
// 如果利用对象的形式修改了原型对象,别忘了利用constructor 指回原来的构造函数
Son.prototype.constructor = Son;
// 这个是子构造函数专门的方法
Son.prototype.exam = function() {
    console.log('孩子要考试');

}
var son = new Son('刘德华', 18, 100);
console.log(son);
console.log(Father.prototype);
console.log(Son.prototype.constructor);