/* 
问题：
1.定义变量时有无 var 声明的区别

*/
var arr1 = new Array();
var arr2 = []
console.log(arr1);
console.log(arr2);

console.log(arr1.length);

// 数组末尾新增元素
arr1[arr1.length] = 1
console.log(arr1);

arr3 = [1,2,3,4]
arr_str = arr3.join('&')
console.log(arr_str);

// 数组新增元素
var arr4 = [1,2,3]
console.log(arr4);
arr4.length = 5  // 修改数组长度
console.log(arr4);
console.log(arr4.length);
arr4[4] = 'add'
console.log(arr4);
arr4[8] = 'hello' // 修改索引号，赋值
console.log(arr4);
console.log(arr4.length);
