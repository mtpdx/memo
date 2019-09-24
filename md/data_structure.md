### 1. Array

- push()

- pop()

- unshift()

- shift()

- splice()

  > array.splice(start[, deleteCount[, item1[, item2[, *...]]]]*)

- [other methods](./array.md)

### 2. Stack

> 先进后出
>
> push(element)
>
> pop()
>
> peek() 
>
> isEmpty()
>
> clear()
>
> size()

```javascript
// 基于数组的栈
// 大部分方法时间复杂度O(n)
class Stack{
    constructor(){
        this.items = []
    }

    push(element){
        this.items.push(element)
    }

    pop(){
        return this.items.pop()
    }
    
    peek(){
        return this.items[this.items.length - 1]
    }

    clear(){
        this.items = []
    }
    
    isEmpty(){
        return this.items.length === 0
    }

    size(){
        return this.items.length
    }
}

let stack1 = new Stack()
stack1.push(1)
stack1.push(2)
stack1.push(3)
console.log(stack1);
stack1.pop()
console.log(stack1);
```



```javascript
// 基于object的栈
// 时间复杂度O(1)

class Stack {
    constructor() {
        this.count = 0
        this.items = {}
    }

    push(element) {
        this.items[this.count] = element
        this.count++
    }

    pop() {
        if (this.isEmpty()) {
            return undefined
        }
        this.count--
        const tmp = this.items[this.count]
        delete this.items[this.count]
        return tmp
    }

    peek() {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.count - 1]
    }

    isEmpty() {
        return this.count === 0
    }

    clear() {
        this.count = 0
        this.items = {}
    }

    size() {
        return this.count
    }
}

let stack1 = new Stack()
stack1.push(1)
stack1.push(2)
stack1.push(3)
console.log(stack1); // Stack { count: 3, stack: { '0': 1, '1': 2, '2': 3 } }
stack1.pop()
console.log(stack1);

// 缺陷:count,stack非私有属性

```



```javascript
// Stack应用
// 十进制转其他进制(倒去余数)

function decimal2binary(decNum){
    const remStack = new Stack()
    let number  =decNum
    let rem
    let binaryStr = ''
    while(number > 0){
        rem = Math.floor(number % 2)
        remStack.push(rem)
        number = Math.floor(number / 2)     
    }
    while(!remStack.isEmpty()){
        binaryStr += remStack.pop().toString()  
    }
    return binaryStr
}

// base 进制 [2, 36]
function decimal2whatever(decNum, base){
    const remStack = new Stack()
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let number  =decNum
    let rem
    let tmpStr = ''
    if(base < 2 || base > 36){
       return ''
    }
    while(number > 0){
        rem = Math.floor(number % base)
        remStack.push(rem)
        number = Math.floor(number / base)     
    }
    while(!remStack.isEmpty()){
        tmpStr += digits[remStack.pop()]  
    }
    return tmpStr
}

```



> 两个栈实现一个队列

```javascript
class Quene{
    constructor(){
        this.inStack = new Stack()
        this.outStack = new Stack()
    }

    enquene(element){
        this.inStack.put(element)
    }

    dequene(){
        if(this.outStack.length() === 0){
            if(this.inStack.length() === 0){
                return undefined
            }else{
                while(this.inStack.length() !== 0){
                    this.outStack.put(this.inStack.pop())
                }             
            }
        }
        return this.outStack.pop()
    }
}

let quene1 = new Quene()
console.log(quene1.dequene());
quene1.enquene(1)
console.log(quene1);
console.log(quene1.dequene());
quene1.enquene(2)
console.log(quene1);
quene1.enquene(3)
console.log(quene1);
console.log(quene1.dequene());
console.log(quene1);
quene1.enquene(4)
console.log(quene1);
quene1.enquene(5)
quene1.enquene(6)
console.log(quene1);
```



### 3. Quene

> 先进先出
>
> enquene(element)
>
> dequene()
>
> peek()
>
> isEmpty()
>
> clear()
>
> size()

```javascript
// 使用对象实现更高效
class Quene{
    constructor(){
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }
    
    enquene(element){
        this.items[this.count] = element
        this.count++
    }
    
    dequene(){
        if(this.isEmpty()){
            return undefined
        }
        const tmp = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return tmp
    }
    
    peek(){
        if(this.isEmpty()){
            return undefined
        }
        return this.items[this.lowestCount]
    }
    
    isEmpty(){
        return this.count - this.lowestCount === 0
    }
    
    clear(){
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }
    
    size(){
        return this.count - this.lowestCount
    }
}
```



> 两个队列实现一个栈

```javascript
class Stack{
    constructor(){
        this.quene1 = new Quene()
        this.quene2 = new Quene()
    }

    push(element){
        if(this.quene1.length() === 0){
            this.quene2.enquene(element)
        }else{
            this.quene1.enquene(element)
        }
    }

    pop(){
        // console.log(this.quene1.length());
        // console.log(this.quene2.length());
        
        if(this.quene1.length() === 0 && this.quene2.length() === 0){
            return undefined
        }
        if(this.quene1.length() === 0){
            while(this.quene2.length() !== 1){
                this.quene1.enquene(this.quene2.dequene())
            }
            console.log(this.quene1);
            console.log(this.quene2);
            
            return this.quene2.dequene()
        }else{
            while(this.quene1.length() !== 1){
                this.quene2.enquene(this.quene1.dequene())
            }
            return this.quene1.dequene()
        }
    }
}

let stack1 = new Stack()
stack1.push(1)
stack1.push(2)
stack1.push(3)
console.log(stack1);
console.log(stack1.pop());
console.log(stack1);
stack1.push(4)
console.log(stack1);
```



> 双端队列 Deque  (double-ended quene)

```javascript

```



### 4. LinkedList

