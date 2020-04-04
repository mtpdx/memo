> - CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
> - CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

### 1. node Module



### 2. es6 Module

> ES6 模块不是对象，而是通过`export`命令显式指定输出的代码，再通过`import`命令输入。

```javascript
// ES6模块
import { stat, exists, readFile } from 'fs';
// 编译时加载(静态加载)

// es6模块自动采用严格模式
// ES6 模块之中，顶层的this指向undefined
```

- `export`语句输出的`接口`，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值

- `export`命令可以出现在模块的任何位置，只要处于模块顶层就可以;

- `import`命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口;

  ```javascript
  import {a} from './xxx.js'
  a.foo = 'hello'; // 合法操作
  // 这种写法不建议,很难查错
  ```

  

- `import`命令具有提升效果，会提升到整个模块的头部，首先执行;

- `import`是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

  ```javascript
  // 报错
  import { 'f' + 'oo' } from 'my_module';
  
  // 报错
  let module = 'my_module';
  import { foo } from module;
  
  // 报错
  if (x === 1) {
    import { foo } from 'module1';
  } else {
    import { foo } from 'module2';
  }
  ```

  

- `import`语句会执行所加载的模块

- 多次重复执行同一句`import`语句，那么只会执行一次，而不会执行多次

- `import`简写

  ​	

  ```javascript
  import _,* as obj from './a.js';
  ```

  

- `export *`命令会忽略模块的`default`方法

- `export default`命令用于指定模块的默认输出;一个模块只能有一个默认输出，因此`export default`命令只能使用一次

  ```javascript
  // modules.js
  function add(x, y) {
    return x * y;
  }
  export {add as default};
  // 等同于
  // export default add;
  
  // app.js
  import { default as foo } from 'modules';
  // 等同于
  // import foo from 'modules';
  ```

  

- export 与 import 的复合写法

  ```javascript
  export { foo, bar } from 'my_module';
  // 可以简单理解为
  import { foo, bar } from 'my_module';
  export { foo, bar };
  
  // 接口改名
  export { foo as myFoo } from 'my_module';
  
  // 整体输出
  export * from 'my_module';
  
  // 默认接口
  export { default } from 'foo';
  
  // 具名接口改为默认接口
  export { es6 as default } from './someModule';
  // 等同于
  import { es6 } from './someModule';
  export default es6;
  ```

  

- `import()`  动态异步加载

  > import()返回一个 Promise 对象
  >
  > 应用场景:按需加载,条件加载,动态加载

  

  ```javascript
  // module.js
  class Dialog{
      show(){
          console.log('todo');
      }
  }
  const a = 1;
  export {
      a,
      Dialog as default 
  }
  // export default Dialog
  
  
  // test.js
  let btn = document.createElement('button');
  btn.addEventListener('click',function(){
      // import()语法 返回的是一个promise 
      // 默认导出的结果 import * as res from './module'
      import('./module').then((res)=>{ // default是关键字,不能直接解构为{default}
          new res.default().show();
          console.log(res)
      }); // 异步组件
  });
  document.body.appendChild(btn);
  ```

  

- 