Data Type

### Undefined

```javascript
var gender = undefined;		// declared and initialized a value of `undefined`
var nationality = 'China';	// declared and initialized
var name;	                // declared but not initialized
// var age = 18;	        // not declared

console.log(gender);   // undefined
console.log(nationality);   // China
console.log(name);          // undefined
console.log(age);        // ReferenceError: age is not defined

console.log(typeof gender);    // undefined
console.log(typeof nationality);    // String
console.log(typeof name);   // undefined
console.log(typeof age);    // undefined
```



### Null

```javascript
console.log(typeof null);		// 'object'

console.log(null == undefined);		// true
```



### Boolean

| Data Type |        values converted to true        | values converted to false |
| :-------: | :------------------------------------: | :-----------------------: |
|  Boolean  |                  true                  |           false           |
|  String   |          any nonempty string           |            ""             |
|  Number   | any nonzero number(including infinity) |          0 / NAN          |
|  Object   |               any object               |           null            |
| Undefined |          n/a (not applicable)          |         undefined         |



### Number

- Octal literals are invalid when running in strict mode and will cause the JavaScript engine to throw a syntax error. 
- Numbers created using octal or hexadecimal format are treated as decimal numbers in all arithmetic operations.



### NaN

```javascript
console.log(NaN == NaN);		// false
```

