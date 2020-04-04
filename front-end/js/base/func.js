/* 
预解析：变量/函数
*/

/* 
问题：
1.定义变量时有无 var 声明的区别:
    
 */

function fn(){
    console.log(arguments);  // 伪数组，不具有数组的pop,push方法
    console.log(arguments.length);
    for(var i = 0; i < arguments.length; i++){
        console.log(arguments[i]);  
    }  
}

fn('hello', 'hahh', 'world')