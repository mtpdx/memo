array方法实现

> [array](https://juejin.im/post/5d82c12ff265da03a31d6f92?utm_source=gold_browser_extension#heading-78)

![1569296915668](assets/array.assets/1569296915668.png)

![1569296969869](assets/array.assets/1569296969869.png)



```javascript

array = [10, 20, 30, 40, 50]

// forEach
function forEach(array, callback) {
    const { length } = array
    for (let index = 0; index < length; index++) {
        const element = array[index];
        callback(element, index, array)
    }
}
// forEach(array, (...args) => console.log(args))


// map 
function map(array, callback) {
    const result = []
    const { length } = array
    for (let index = 0; index < length; index++) {
        const element = array[index]
        result[index] = callback(element, index, array)
    }
    return result
}
console.log(map(array, element => element + ' map'));


// push
function push(array, ...elements) {
    const { length: arrayLen } = array
    const { length: elementsLen } = elements
    for (let index = 0; index < elementsLen; index++) {
        array[arrayLen + index] = elements[index];
    }
    return array.length
}


// filter
function filter(array, callback) {
    const result = []
    const { length } = array
    for (let index = 0; index < length; index++) {
        const element = array[index];
        if (callback(element, index, array)) {
            push(result, element)
        }
    }
    return result
}
console.log(filter(array, element => element % 2 == 0));


// reduce
function reduce(array, callback, initValue) {
    const { length } = array
    let cbTmp = initValue
    let startAtIndex = 0
    if (initValue === undefined) {
        cbTmp = array[0]
        startAtIndex = 1
    }
    for (let index = startAtIndex; index < length; index++) {
        const element = array[index]
        cbTmp = callback(cbTmp, element, index, array)

    }
    return cbTmp;
}
console.log(reduce(array, (sum, element) => sum + element));


// findIndex
function findIndex(array, callback) {
    const { length } = array
    for (let index = 0; index < length; index++) {
        const element = array[index];
        if (callback(element, index, array)) {
            return index
        }
    }
    return -1
}
console.log(findIndex(array, element => element == '20'));


// find 
function find(array, callback) {
    let index = findIndex(array, callback)
    return index === -1 ? undefined : array[index]
}


// indexOf
function indexOf(array, searchValue) {
    return findIndex(array, value => value === searchValue)
}

// lastIndexOf
function lastIndexOf(array, searchValue) {
    const { length } = array
    for (let index = length - 1; index > -1; index--) {
        const element = array[index];
        if (element === searchValue) {
            return index
        }
    }
    return -1
}

// every
function every(array, callback) {
    const { length } = array
    for (let index = 0; index < length; index++) {
        const element = array[index]
        if (!callback(element, index, array)) {
            return false
        }
    }
    return true
}
console.log(every(array, value => value > 20));


// some
function some(array, callback) {
    const { length } = array
    for (let index = 0; index < length; index++) {
        const element = array[index];
        if (callback(element, index, array)) {
            return true
        }
    }
    return false
}

// includes
function includes(array, searchValue) {
    return some(array, value => value === searchValue)
}


// ----------
// concat
function concat(array, ...values) {
    const result = [...array]
    const { length } = values
    for (let index = 0; index < length; index++) {
        const element = array[index]
        if (Array.isArray(element)) {
            push(result, ...element)
        } else {
            push(result, element)
        }
    }
    return result
}


// join
function join(array, joinWith) {
    return reduce(array, (result, current, index) => {
        if (index === 0) {
            return current
        }
        return `${result}${joinWith}${current}`
    }, '')
}



// reverse
function reverse(array) {
    const result = []
    const lastIndex = array.length - 1
    for (let index = lastIndex; index > -1; index--) {
        const element = array[index]
        result[lastIndex - index] = element
    }
    return result
}

```

