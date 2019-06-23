 // 1. 创建类 class  创建一个 明星类
 class Star {
    constructor(uname, age) {
        this.uname = uname;
        this.age = age;
    }

    sing(song) {
        console.log(this.uname + song);

    }
}

// 2. 利用类创建对象 new
var ldh = new Star('刘德华', 18);
var zxy = new Star('张学友', 20);
console.log(ldh);
console.log(zxy);
//(1) 通过class 关键字创建类, 类名我们还是习惯性定义首字母大写
//(2) 类里面有个constructor 函数,可以接受传递过来的参数,同时返回实例对象
//(3) constructor 函数 只要 new 生成实例时,就会自动调用这个函数, 如果我们不写这个函数,类也会自动生成这个函数
//(4) 生成实例 new 不能省略
//(5) 最后注意语法规范, 创建类 类名后面不要加小括号,生成实例 类名后面加小括号, 构造函数不需要加function

//(1) 类里面所有的函数不需要写function 
//(2) 多个函数方法之间不需要添加逗号分隔
ldh.sing('冰雨');
zxy.sing('李香兰');



// 1. 类的继承
// class Father {
//     constructor() {

//     }
//     money() {
//         console.log(100);

//     }
// }
// class Son extends Father {

// }
// var son = new Son();
// son.money();
class Father {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    sum() {
        console.log(this.x + this.y);

    }
}
class Son extends Father {
    constructor(x, y) {
        super(x, y); //调用了父类中的构造函数
    }
}
var son = new Son(1, 2);
var son1 = new Son(11, 22);
son.sum();
son1.sum();


// super 关键字调用父类普通函数
class Animal {
    say() {
        return '我是Animal';
    }
}
class Tiger extends Animal {
    say() {
        // console.log('我是Tiger');
        console.log(super.say() + '中的Tiger');
        // super.say() 就是调用父类中的普通函数 say()
    }
}
var tiger = new Tiger();
tiger.say();
// 继承中的属性或者方法查找原则: 就近原则
// 1. 继承中,如果实例化子类输出一个方法,先看子类有没有这个方法,如果有就先执行子类的
// 2. 继承中,如果子类里面没有,就去查找父类有没有这个方法,如果有,就执行父类的这个方法(就近原则)


/* 
子类继承父类\方法 同时扩展自己方法
*/
class Spider{
    constructor(from, parse_type){
        this.from = from;
        this.parse_type = parse_type;
    }

    run(){
        console.log('from: '+ this.from + ', parse_type: '+ this.parse_type);
        
    }
}
class DeeSpider extends Spider{
    constructor(from, parse_type){
        super(from, parse_type)
        this.from = from;
        this.parse_type = parse_type;
    }

    setParseType(new_type){
        this.parse_type = new_type
    }
}
var deeSpider = new DeeSpider('jd', 'lxml');
deeSpider.parse_type = 'bs4';
deeSpider.run();
deeSpider.setParseType('html.parse');
deeSpider.run();