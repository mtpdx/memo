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

var x = 0;
setInterval(function(){
    console.log('i: ' + x);
    x++;
},1000);

setTimeout(function(){
    console.log('t: ' + x);
    x++;
},1000);