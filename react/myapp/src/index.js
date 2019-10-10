import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

class CInput extends React.Component{
    constructor(){
        super()
        this.state = {
            text: '',
            content: '',
            city: '',
            isChecked: false,

        }
    }

    handleForm = e =>{
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        this.setState({
            [target.name]: value
        })
    }

    render(){
        return (
            <div>
                {/* text */}
                <input type="text" name="text" value={this.state.text} onChange={this.handleForm} />
                {/* textarea */}
                <textarea name="content" id="" cols="30" rows="10" value={this.state.content} onChange={this.handleForm}></textarea>
                {/* select */}
                <select name="city" id="" value={this.city} onChange={this.handleForm}>
                    <option value="sh">shanghai</option>
                    <option value="bj">beijing</option>
                    <option value="cf">chifeng</option>
                </select>
                {/* check */}
                <input type="checkbox" name="isChecked" checked={this.state.isChecked} onChange={this.handleForm}/>
            </div>
        )
    }
}

class FInput extends React.Component{
    constructor(){
        super()
        this.textRef = React.createRef()
    }

    getText = () => {
        console.log('text value: ', this.textRef.current.value);
        
    }

    render(){
        return (
            <div>
                <input type="text" ref={this.textRef}/>
                <button onClick={this.getText}></button>
            </div>
        )
    }
}

// PropsTest
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
// ReactDOM.render(<CPropsTest name="sunyh class" />, document.getElementById('root'));

function FPropsTest(props){
    return (
        <div>hello: {props.name}</div>
    )
}
// ReactDOM.render(<FPropsTest name="sunyh func" />, document.getElementById('root'));

class Parent extends React.Component{
    constructor(){
        super()
        this.state = {
            name: 'p sunyh p',
            childMsg: '',
        }
    }

    getChildMsg = msg => {
        this.setState({
            childMsg: msg
        })
    }

    render(){
        return (
            <div style={{backgroundColor:"pink"}}>
                <p>Parent send data: {this.state.name}</p>
                <p>Parent receive data: {this.state.childMsg}</p>
                <Child name={this.state.name} getMsg={this.getChildMsg}/>
            </div>
        )
    }
}

class Child extends React.Component{
    constructor(){
        super()
        this.state = {
            childMsg: 'c sunyh c',
        }
    }
    handleClick = e => {
        this.props.getMsg(this.state.childMsg)
    }

    render(){
        return (
            <div style={{backgroundColor:"yellow"}}>
                <p>Child receive data: {this.props.name}</p>
                <button onClick = {this.handleClick}>send data to p</button>
            </div>
        )
    }
}

// ReactDOM.render(<Parent />, document.getElementById('root'));

class Counter extends React.Component{
    constructor(){
        super()
        this.state = {
            count: 0,
        }
    }
    increment = ()=>{this.setState({count: this.state.count + 1})}
    decrement = ()=>{this.setState({count: this.state.count - 1})}

    render(){
        return(
            <div>
                <C1 count={this.state.count}/>
                <C2 increment={this.increment} decrement={this.decrement}/>
            </div>
        )
    }
}

class C1 extends React.Component{
    render(){
        return (
            <p>Counter: {this.props.count}</p>
        )
    }
}

class C2 extends React.Component{
    render(){
        return (
            <div>
                <button onClick={()=>{this.props.increment()}}> + </button>
                <button onClick={()=>{this.props.decrement()}}> - </button>
            </div>
        )
    }
}

// ReactDOM.render(<Counter />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
