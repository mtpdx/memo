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

```javascript
// 函数组件

// 函数名大写
// 必须有返回值 
// 返回值可以为null, 表示不渲染任何东西
function Hello() {
    return (
        <div>这是第一个函数组件</div>
    )
}
// 组件名作为标签名
ReactDOM.render(<Hello />,document.getElementById('root'))
```



```javascript
// 类组件
// 类名大写
// 类组件继承React.Component
// 类组件必须提供render方法
// render中必须有返回值,可以为null
class Hello extends React.Component{
    render(){
        return (
            <div>这是第一个类组件</div>
        )
    }
}
ReactDOM.render(<Hello />,document.getElementById('root'))
```



```javascript
// 组件抽离
import React from 'react'
export default class extends React.Component {
    render(){
        return (
            <div>单独抽离出来的 Hello</div>
        )
    }
}

import Hello from './Hello'
ReactDOM.render(<Hello />,document.getElementById('root'))
```



### React事件处理

```javascript
// 事件绑定
export default class extends React.Component {
    // 驼峰命名
    clickHandle(e){
        console.log('div click')
    }
    render(){
        return (
            <div><button onClick = {this.clickHandle}>点我点我点我</button></div>
        )
    }
}
```



```javascript
// 事件对象
// 合成事件：兼容所有浏览器，无需担心跨浏览器兼容问题
// 除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 `stopPropagation()`和 `preventDefault()`
export default class extends React.Component {
    clickHandle(e){
        // 获取原生事件对象
        console.log(e.nativeEvent)
    }
    render(){
        return (
            <div><button onClick = {this.clickHandle}>点我点我点我</button></div>
        )
    }
}
```



### 有状态组件&无状态组件

```
// 函数组件 --> 无状态组件
// 类组件 --> 有状态组件
```



### State & setState

```javascript
export default class extends React.Component {
    constructor(){
        super()
        // 第一种初始化方式
        this.state = {
            count : 0
        }
    }
    // 第二种初始化方式
    state = {
        count:1
    }
    render(){
        return (
            <div>计数器 :{this.state.count}</div>
        )
    }
}
```



```javascript
// setState() 修改状态
// 语法：this.setState({要修改的数据})
// 不要直接修改state中的值，这是错误的
export default class extends React.Component {
    state = {
        count:1
    }
    render(){
        return (
            <div>
                <div>计数器 :{this.state.count}</div>
                <button onClick={() => {
                     this.setState({
            	 		count: this.state.count+1
           			  })   
                }}>+1</button>
            </div>
        )
    }
}

// 抽取事件处理函数
// 1. =>
export default class extends React.Component {
    state = {
        count:1
    }
	onIncrement(){
        this.setState({count: this.state.count+1})
    }
    render(){
        return (
            <div>
                <div>计数器 :{this.state.count}</div>
			   // error
			   // <button onClick={this.onIncrement}>+1</button>
                <button onClick={() => this.onIncrement()}>+1</button>
            </div>
        )
    }
}

// 2. bind
export default class extends React.Component {
    constructor() {
    super()
	this.state = {
        count:1
    }
    // 通过bind方法改变了当前函数中this的指向
    this.onIncrement = this.onIncrement.bind(this)
  	}
    
	onIncrement(){
        this.setState({count: this.state.count+1})
    }
    render(){
        return (
            <div>
                <div>计数器 :{this.state.count}</div>
			   <button onClick={this.onIncrement}>+1</button>
            </div>
        )
    }
}

// 3. class实例方法  (实验性语法 babel可以转化)
export default class extends React.Component {
    state = {
        count:1
    }
	onIncrement = () => {
        this.setState({count: this.state.count+1})
    }
    render(){
        return (
            <div>
                <div>计数器 :{this.state.count}</div>
			   <button onClick={this.onIncrement}>+1</button>
                <button onClick={() => this.onIncrement()}>+1</button>
            </div>
        )
    }
}
```

