解构赋值

... (剩余运算符, 展开运算符)

```javascript
let arr1 = [1,2];
let arr2 = [2,3]; 
console.log([...arr1,...arr2]);	// [1, 2, 2, 3]
```



```javascript
let obj1 = {name:{a:1}, age: 9};
let obj2 = {age:10,name:{b:2}};
console.log({...obj1,...obj2}); // { name: { b: 2 }, age: 10 }

// mergeOptions

```

