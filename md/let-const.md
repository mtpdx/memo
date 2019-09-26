### 1. var

- 污染全局变量 (常见作用域 window, function, with)

  ```html
  //a.js
  <script>
      var a = 123, b = "hello world";
  </script>
  
  //b.js
  <script>
      var a, c = "abc";
  </script>
  
  // a.js 和 b.js 都有全局变量 window.a ，导致冲突
  ```

  ```javascript
  // 解决方法
  
  // 1. 全局变量命名空间
  var GLOBAL = {};
  //a.js
  (function() {
      var a = 123, b = "hello world";
      GLOBAL.A.a = a;
  })();
  //b.js
  (function() {
      var a, c = "abc";
      alert(GLOBAL.A.a);
  })();
  
  // 2. 自执行函数
  //a.js
  (function() {
      var a = 123, b = "hello world";
  })();
  //b.js
  (function() {
      var a, c = "abc";
  })();
  ```

  

- 变量提升(没有声明之前 会预先定义)

  ```javascript
  var a; // 声明变量 ;不会被分配内存
  a = 0 ;// 定义变量 ;定义就是分配了内存
  ```

  

- var 可以被定义多次

- var不能声明常量

- var默认不会产生作用域

### 2. let

- let 不会污染全局变量
- 不存在变量提升
- 不能被重复定义(同一个作用域下不能重复定义)

### 3. const

- 定义常量