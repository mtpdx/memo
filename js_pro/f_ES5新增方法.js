/* 
forEach
filter
some
trim
Object.keys();
Object.defineProperty();
*/

/* 
Object.defineProperty(obj, 'prop', {
    writable: false,
    enumerable: false,
    configurable: false
});
*/

// var x = 0;
// setInterval(function(){
//     console.log('i: ' + x);
//     x++;
// },1000);

// setTimeout(function(){
//     console.log('t: ' + x);
//     x++;
// },1000);


var obj = {name : 'curry', age : 29}
var obj1 = {};
obj1 = Object.create(obj, {
    sex : {
        value : '男',
        writable : true
    }
});
obj1.sex = '女';
console.log(obj1.sex);

//Object.defineProperties(object, descriptors)
var obj2 = {
    firstName : 'curry',
    lastName : 'stephen'
};
Object.defineProperties(obj2, {
    fullName : {
        get : function () {
            return this.firstName + '$$' + this.lastName
        },
        set : function (data) {
            var names = data.split('-');
            this.firstName = names[0];
            this.lastName = names[1];
        }
    }
});
console.log(obj2.fullName);
obj2.firstName = 'tim';
obj2.lastName = 'duncan';
console.log(obj2.fullName);
obj2.fullName = 'kobe-bryant';
console.log(obj2.fullName);



let Person  = {}
Person.gender = 'male'
// 等价于
Object.defineProperty(Person, 'male', {
    value: 'male',
    configurable: true,
    writable: true,
    enumerable: true
});

Person.defineProperty(Person, 'age', {
    value: '26',
})
// 等价于
Object.defineProperty(Person, 'age', {
    value: '26',
    configurable: false,
    writable: false,
    enumerable: false
});
