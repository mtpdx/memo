### 1. generator

> redux-saga  dva 

```javascript
let fs = require('fs').promises;

function * read(){
    try{
        let filename =  yield fs.readFile('./name.txt','utf8');
        let age = yield fs.readFile(filename,'utf8');
        return age;
    }catch(e){
        console.log(e);
    }
}

let it = read();
let {done,value} = it.next()
value.then(data=>{
    let {value,done} = it.next(data)
    value.then(data=>{
        let {value,done} = it.next(data);
        console.log(value,done)
    })
},err=>{
    it.throw(err);
})
```



> co库 

```javascript
let fs = require('fs').promises;

function * read(){
    try{
        let filename =  yield fs.readFile('./name.txt','utf8');
        let age = yield fs.readFile(filename,'utf8');
        return age;
    }catch(e){
        console.log(e);
    }
}

let co = require('co');
co(read()).then(data=>{
    console.log(data);
});
```



> co库原理	

```javascript
function co(it){
    return new Promise((resolve,reject)=>{
        // 异步调用 等待第一个next 执行完后 再调用第二个
        function next(data){ // 异步的递归 next方法
           let {value,done} =  it.next(data);
           if(done){
                resolve(value); // 最终的结果抛出来了
           }else{
               	// value类型不确定,可能是promise且resolve返回的是promise
               	// 使用Promise.resolve兼容value
                Promise.resolve(value).then(data=>{
                    next(data);
                },err=>{ // 如果出错将错误抛出来
                    it.throw(err);
                })
           }
        }
        next();
    })
}
```

> es7 语法 async + await

```javascript
async function read(){ // async 函数的执行结果是promise
    let filename =  await fs.readFile('./name1.txt','utf8');
    let age = await fs.readFile(filename,'utf8');
    return age;

}
read().then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
});
```

