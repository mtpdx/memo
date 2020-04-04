### props

- props只读,可以传递任意类型数据
- 类组件,构造函数中要使用props,应将props传递给super()

```javascript
class CPropsTest extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        return(
            <div>hello: {this.props.name}</div>
        )
    }
}
ReactDOM.render(<CPropsTest name="sunyh class" />, document.getElementById('root'));
```

```javascript
function FPropsTest(props){
    return (
        <div>hello: {props.name}</div>
    )
}
ReactDOM.render(<FPropsTest name="sunyh func" />, document.getElementById('root'));
```



### 组件通信