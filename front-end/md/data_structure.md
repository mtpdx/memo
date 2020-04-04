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
>
> toString()

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
    
    toString(){
        if(this.isEmpty()){
            return ''
        }
        let objString  = `${this.items[this.lowestCount]}`
        for(let i = this.lowestCount + 1; i < this.count; i++){
            objString = `${objString}, ${this.items[i]}`
        }
        return objString
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
>
> addFront(element)
>
> addBack(element)
>
> removeFront()
>
> removeBack()
>
> peekFront()
>
> peekBack()

```javascript
class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.items[0] = element;
    }
  }

  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}

```

```javascript
// 队列 demo 击鼓传花
function hotPotato(elementsArray, num) {
  const quene = new quene()
  const elimitatedArray = []

  for (let index = 0; index < elementsArray.length; index++) {
    const element = elementsArray[index];
    quene.enquene(element)
  }

  while(quene.size() > 1){
    for (let index = 0; index < num; index++) {
      quene.enquene(quene.dequene())  
    }
    elimitatedArray.push(quene.dequene())
  }

  return {
    eliminated: elimitatedArray,
    winner: quene.dequene()
  }
}
```



```javascript
// 双端队列 demo 回文检查器
// 回文是正反都能读通的单词、词组、数或一系列字符的序列，例如 madam或racecar
function palindromeChecker(aString) {
  if (aString === null || aString === undefined || (aString !== null && aString.length === 0)) {
    return false;
  }

  const deque = new Deque();
  const lowerString = aString.toLocaleLowerCase().split(' ').join('')
  let firstChar, lastChar;
  for (let index = 0; index < lowerString.length; index++) {
    const element = lowerString.charAt(index);
    deque.addBack(element);
  }

  while (deque.size() > 1) {
    firstChar = deque.removeFront()
    lastChar = deque.removeBack()
    if (firstChar !== lastChar) {
      return false;
    }
  }

  return true;
}
```



### 4. LinkedList

> push(element)
>
> insert(element, position)
>
> getElementAt(index)
>
> remove(element)
>
> indexOf(element)
>
> removeAt(position)
>
> isEmpty()
>
> size()
>
> toString()
>
> 链表最后一个节点的下一个元素始终是null或undefined

```javascript
class Node {
    constructor(element, next) {
        this.element = element
        this.next = next
    }
}

function defaultEquals(a, b) {
    return a === b;
}

class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0
        this.head = undefined
        this.equalsFn = equalsFn
    }

    push(element) {
        const node = new Node(element)
        if (this.head == null) {
            this.head = node
        } else {
            let current = this.head
            // 获取最后一个节点
            while (current.next != null) {
                current = current.next
            }
            current.next = node
        }
        this.count++
    }

    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next
            } else {
                // 获取index节点
                // let i = 0;
                // let previous;
                // while (i < index) {
                //     previous = current
                //     current = current.next
                //     i++;
                // }
                // previous.next = current.next
                let previous = this.getElementAt(index - 1)
                current = previous.next
                previous.next = current.next
            }
            this.count--;
            return current.element
        }
        return undefined
    }

    getElementAt(index) {
        if (index >= 0 && index < this.count) {
            let node = this.head
            for (let i = 0; i < index && node != null; i++) {
                node = node.next
            }
            return node
        }
        return undefined
    }

    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) {
                const current = this.head
                node.next = current
                this.head = node
            } else {
                const previous = this.getElementAt(index - 1)
                node.next = previous.next
                previous.next = node
            }
            this.count++;
            return true
        }
        return false
    }

    indexOf(element) {
        let current = this.head
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.elemnet)) {
                return i
            }
            current = current.next
        }
        return -1
    }

    remove(element) {
        const index = this.indexOf(element)
        return this.removeAt(index)
    }

    isEmpty() {
        return this.size() === 0
    }

    size() {
        return this.count
    }

    getHead() {
        return this.head
    }

    clear() {
        this.count = 0
        this.head = undefined
    }

    toString() {
        if (this.head == null) {
            return ''
        }
        let objString = `${this.head.element}`
        let current = this.head.next
        while (current != null) {
      		objString = `${objString},${current.element}`;
      		current = current.next;
    	}
        // for (let index = 0; index < this.size() && current != null; index++) {
        //     objString = `${objString},${current.element}`
        //     current = current.next
        // }
        return objString
    }
}
```

> 双向链表

```javascript
class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;
  }
}

class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.tail = undefined;
  }

  push(element) {
    const node = new DoublyNode(element);
    if (this.head == null) {
      this.head = node;
      this.tail = node; // NEW
    } else {
      // attach to the tail node // NEW
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.count++;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) { // NEW
          this.head = node;
          this.tail = node; // NEW
        } else {
          node.next = this.head;
          this.head.prev = node; // NEW
          this.head = node;
        }
      } else if (index === this.count) { // last item NEW
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        node.next = current;
        previous.next = node;
        current.prev = node; // NEW
        node.prev = previous; // NEW
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = this.head.next;
        // if there is only one item, then we update tail as well //NEW
        if (this.count === 1) {
          // {2}
          this.tail = undefined;
        } else {
          this.head.prev = undefined;
        }
      } else if (index === this.count - 1) {
        // last item //NEW
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = undefined;
      } else {
        current = this.getElementAt(index);
        const previous = current.prev;
        // link previous with current's next - skip it to remove
        previous.next = current.next;
        current.next.prev = previous; // NEW
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }

  indexOf(element) {
    let current = this.head;
    let index = 0;
    while (current != null) {
      if (this.equalsFn(element, current.element)) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  clear() {
    super.clear();
    this.tail = undefined;
  }

  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    while (current != null) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }

  inverseToString() {
    if (this.tail == null) {
      return '';
    }
    let objString = `${this.tail.element}`;
    let previous = this.tail.prev;
    while (previous != null) {
      objString = `${objString},${previous.element}`;
      previous = previous.prev;
    }
    return objString;
  }
}

```

> 循环链表(CircularLinkedList ): 最后一个节点的next指向head节点

```javascript
class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
  }

  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.getElementAt(this.size() - 1);
      current.next = node;
    }
    // set node.next to head - to have circular list
    node.next = this.head;
    this.count++;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current = this.head;
      if (index === 0) {
        if (this.head == null) {
          // if no node  in list
          this.head = node;
          node.next = this.head;
        } else {
          node.next = current;
          current = this.getElementAt(this.size());
          // update last element
          this.head = node;
          current.next = this.head;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        if (this.size() === 1) {
          this.head = undefined;
        } else {
          const removed = this.head;
          current = this.getElementAt(this.size() - 1);
          this.head = this.head.next;
          current.next = this.head;
          current = removed;
        }
      } else {
        // no need to update last element for circular list
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }
}

```

> 双向循环链表: head节点的prev指向tail节点,tail节点的next指向head节点



> 有序链表(SortedLinkedList)

```javascript
SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn);
    this.equalsFn = equalsFn;
    this.compareFn = compareFn;
  }

  push(element) {
    if (this.isEmpty()) {
      super.push(element);
    } else {
      const index = this.getIndexNextSortedElement(element);
      super.insert(element, index);
    }
  }

  insert(element, index = 0) {
    if (this.isEmpty()) {
      return super.insert(element, index === 0 ? index : 0);
    }
    const pos = this.getIndexNextSortedElement(element);
    return super.insert(element, pos);
  }

  getIndexNextSortedElement(element) {
    let current = this.head;
    let i = 0;
    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element);
      if (comp === Compare.LESS_THAN) {
        return i;
      }
      current = current.next;
    }
    return i;
  }
}

```



### 5. Set

> add(element)
>
> delete(element)
>
> has(element)
>
> clear()
>
> size()
>
> values()

```javascript
class Set {
    constructor() {
        this.items = {}
    }

    /**
     也可以在代码中使用 this.items.hasOwnProperty(element)。
     但是，代码检查工具如 ESLint会抛出一个错误。
     错误的原因为不是所有的对象都继承了 Object.prototype，
     甚至继承了Object.prototype 的对象上的 hasOwnProperty 方法也有可能被覆盖，导致代码不能正常工作。
     要避免出现任何问题，使用 Object.prototype.hasOwnProperty.call 是更安全的做法
     */
    has(elemnet) {
        return Object.prototype.hasOwnProperty.call(this.items, elemnet)
    }

    add(element) {
        if (!this.has(element)) {
            this.items[element] = element
            return true
        }
        return false
    }

    delete(element) {
        if (this.has(element)) {
            delete this.items[element]
            return true
        }
        return false
    }

    values() {
        return Object.values(this.items)
    }

    isEmpty() {
        return this.size() === 0
    }

    size() {
        return Object.keys(this.items).length
    }

    clear() {
        this.items = {}
    }

    toString() {
        if (this.isEmpty) {
            return ''
        }
        return this.values.join(',')
    }

    /**
     * 并集
     * @param {*} otherSet 
     */
    union(otherSet) {
        const unionSet = new Set()
        const totalElements = [...this.values(), ...otherSet.values()]
        totalElements.forEach(element => unionSet.add(element));
        return unionSet
    }

    /**
     * 交集
     * @param {*} otherSet 
     */
    intersection(otherSet) {
        const intersectionSet = new Set()
        if (this.size() > otherSet.size()) {
            otherSet.values().forEach(element => {
                if (this.has(element)) {
                    intersectionSet.add(element)
                }
            })
        } else {
            this.values().forEach(element => {
                if (otherSet.has(element)) {
                    intersectionSet.add(element)
                }
            })
        }
        return intersectionSet
    }

    /**
     * 差集
     * @param {*} otherSet 
     */
    difference(otherSet) {
        const differenceSet = new Set()
        this.values().forEach(elemnet => {
            if (!otherSet.has(element)) {
                intersectionSet.add(element)
            }
        })
        return differenceSet
    }
    /**
     * 是否为 otherSet 子集
     * @param {*} otherSet 
     */
    isSubSetOf(otherSet) {
        if (this.size() > otherSet.size()) {
            return false
        }
        this.values().forEach(element => {
            if (!otherSet.has(element)) {
                return false
            }
        })
        return true
    }
}
```



### 6. Map

> set(key, value)
>
> remove(key)
>
> hasKey(key)
>
> get(key)
>
> clear()
>
> size()
>
> isEmpty()
>
> keys()
>
> values()
>
> keyValues()
>
> forEach(callbackFn)

```javascript

```

