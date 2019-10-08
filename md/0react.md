```javascript
// npm i react react-dom 

// <script src="./node_modules/react/umd/react.development.js"></script>
// <script src="./node_modules/react-dom/umd/react-dom.development.js"></script>

let title = React.createElement('li', null, 'hellow react')
ReactDOM.render(title, root)
```



```javascript
// react脚手架

// npx create-react-app myapp
// cd myapp
// yarn start / npm start

import React from 'react'
import ReactDOM from 'react-dom'

let h1 = React.createElement('h1',null,'我是标题')
ReactDOM.render(h1,document.getElementById('root'))
```



```js
// jsx

// 1.嵌入js表达式   语法：{JavaScritp表达式}
// - 只要是合法的js表达式都可以进行嵌入
// - JSX自身也是js表达式
// - 注意：js中的对象是一个例外，一般只会出现在style属性中
// - 注意：在{}中不能出现语句
let content = '插入的内容'
let h1 = <h1>我是通过JSX创建的元素+ {content}</h1>

// 2.条件渲染
let isLoading = true
let loading = ()=>{
    if(isLoading){
        return <div>Loading...</div>
    }
    return <div>加载完成</div>
}
let h2 = <h1>我是通过JSX创建的元素+ {load()}</h1>
                            
// 3.列表渲染
let arr = [{
    id:1,
    name:'三国演义'
},{
    id:2,
    name:'水浒传'
},{
    id:3,
    name:'西游记'
},{
    id:4,
    name:'红楼梦'
}]
let ul = (<ul>
    {arr.map(item => <li key={item.id}>{item.name}</li>)}
</ul>)
ReactDOM.render(ul,document.getElementById('root'))

// 4.样式处理
// 4.1 行内样式
<li key={item.id} style={{'color': 'red',"backgroundColor": 'pink'}}>{item.name}</li>

// 4.2 类名  -className
.container {
    text-align: center
}

import './css/index.css'
<li className='container' key={item.id} style={{'color': 'red',"backgroundColor": 'pink'}}>{item.name}</li>
```



### react组件