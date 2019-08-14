### Ajax的实现步骤

```javascript
// 1.创建 Ajax 对象
var xhr = new XMLHttpRequest();
// 2.Ajax 请求地址以及请求方式
xhr.open('get', 'http://www.example.com');
// 3.发送请求
xhr.send();
// 4.获取服务器端给与客户端的响应数据
xhr.onload = function () {
     console.log(xhr.responseText);
}

```



### 请求参数传递

```javascript
// get
xhr.open('get', 'http://www.example.com?name=zhangsan&age=20');


// post
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded') xhr.send('name=zhangsan&age=20');

```



### 请求参数格式

```
 // application/x-www-form-urlencoded
 name=zhangsan&age=20&sex=男
 
 
 // application/json
{name: 'zhangsan', age: '20', sex: '男'}


```



### ajax状态码

```
// xhr.readyState 

0：请求未初始化(还没有调用open())
1：请求已经建立，但是还没有发送(还没有调用send())
2：请求已经发送
3：请求正在处理中，通常响应中已经有部分数据可以用了
4：响应已经完成，可以获取并使用服务器的响应了

```



### **onreadystatechange** 事件

```javascript
// 当 Ajax 状态码发生变化时将自动触发该事件
// 兼容ie低版本
xhr.onreadystatechange = function () {
     // 判断当Ajax状态码为4时
     if (xhr.readyState == 4) {
         // 获取服务器端的响应数据
         console.log(xhr.responseText);
     }
 }


```



### ajax 错误处理

```
// http状态码
// xhr.status

// 网络通畅  404 500

// 网络中断  会触发xhr的onerror事件

```



### 低版本ie缓存问题

在低版本的IE 浏览器中，Ajax 请求有严重的缓存问题，即在请求地址不发生变化的情况下，只有第一次请求会真正发送到服务器端，后续的请求都会从浏览器的缓存中获取结果。即使服务器端的数据更新了，客户端依然拿到的是缓存中的旧数据.

解决方案：在请求地址的后面加请求参数，保证每一次请求中的请求参数的值不相同

```javascript
xhr.open('get', 'http://www.example.com?t=' + Math.random());
```



### ajax封装

```javascript
function ajax (options) {
	// 默认值
	var defaults = {
		type: 'get',
		url: '',
		async: true,
		data: {},
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		success: function () {},
		error: function () {}
	}
	// 使用用户传递的参数替换默认值参数
	Object.assign(defaults, options);
	// 创建ajax对象
	var xhr = new XMLHttpRequest();
	// 参数拼接变量
	var params = '';
	// 循环参数
	for (var attr in defaults.data) {
		// 参数拼接
		params += attr + '=' + defaults.data[attr] + '&';
		// 去掉参数中最后一个&
		params = params.substr(0, params.length-1)
	}
	// 如果请求方式为get
	if (defaults.type == 'get') {
		// 将参数拼接在url地址的后面
		defaults.url += '?' + params;
	}

	// 配置ajax请求
	xhr.open(defaults.type, defaults.url, defaults.async);
	// 如果请求方式为post
	if (defaults.type == 'post') {
		// 设置请求头
		xhr.setRequestHeader('Content-Type', defaults.header['Content-Type']);
		// 如果想服务器端传递的参数类型为json
		if (defaults.header['Content-Type'] == 'application/json') {
			// 将json对象转换为json字符串
			xhr.send(JSON.stringify(defaults.data))
		}else {
			// 发送请求
			xhr.send(params);
		}
	} else {
		xhr.send();
	}
	// 请求加载完成
	xhr.onload = function () {
		// 获取服务器端返回数据的类型
		var contentType = xhr.getResponseHeader('content-type');
		// 获取服务器端返回的响应数据
		var responseText = xhr.responseText;
		// 如果服务器端返回的数据是json数据类型
		if (contentType.includes('application/json')) {
			// 将json字符串转换为json对象
			responseText = JSON.parse(responseText);
		}
		// 如果请求成功
		if (xhr.status == 200) {
			// 调用成功回调函数, 并且将服务器端返回的结果传递给成功回调函数
			defaults.success(responseText, xhr);
		} else {
			// 调用失败回调函数并且将xhr对象传递给回调函数
			defaults.error(responseText, xhr);
		} 
	}
	// 当网络中断时
	xhr.onerror = function () {
		// 调用失败回调函数并且将xhr对象传递给回调函数
		defaults.error(xhr);
	}
}
```

```javascript
ajax({ 
     type: 'get',
     url: 'http://www.example.com',
     success: function (data) { 
         console.log(data);
     }
 })
```



### FormData使用

- Formdata 对象不能用于 get 请求，因为对象需要被传递到send方法中，而get请求方式的请求参数只能放在请求地址的后面。
- 服务器端 bodyParser 模块不能解析 formData 对象表单数据，我们需要使用formidable模块进行解析。

```html
 <form id="form">
     <input type="text" name="username" />
     <input type="password" name="password" />
     <input type="button"/>
</form>
```

```javascript
var form = document.getElementById('form'); 
var formData = new FormData(form);
// ...
xhr.send(formData);
```



### FormData实例方法

```javascript
var formData = new FormData();
formData.get('key');
formData.set('key', 'value');
formData.delete('key');
formData.append('key', 'value');
// set 方法与 append 方法的区别是，在属性名已存在的情况下，set 会覆盖已有键名的值，append会保留两个值。
```



FormData二进制文件上传

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="/assets/bootstrap/dist/css/bootstrap.min.css">
	<style type="text/css">
		.container {
			padding-top: 60px;
		}
		.padding {
			padding: 5px 0 20px 0;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="form-group">
			<label>请选择文件</label>
			<input type="file" id="file">
			<div class="padding" id="box">
				<!--<img src="" class="img-rounded img-responsive">-->
			</div>
			<div class="progress">
				<div class="progress-bar" style="width: 0%;" id="bar">0%</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		// 获取文件选择控件
		var file = document.getElementById('file');
		// 获取进度条元素
		var bar = document.getElementById('bar');
		// 获取图片容器
		var box = document.getElementById('box');
		// 为文件选择控件添加onchanges事件
		// 在用户选择文件时触发
		file.onchange = function () {
			// 创建空的formData表单对象
			var formData = new FormData();
			// 将用户选择的文件追加到formData表单对象中
			formData.append('attrName', this.files[0]);
			// 创建ajax对象
			var xhr = new XMLHttpRequest();
			// 对ajax对象进行配置
			xhr.open('post', 'http://localhost:3000/upload');
			// 在文件上传的过程中持续触发
			xhr.upload.onprogress = function (ev) {
				// ev.loaded 文件已经上传了多少
				// ev.total  上传文件的总大小
				var result = (ev.loaded / ev.total) * 100 + '%';
				// 设置进度条的宽度
				bar.style.width = result;
				// 将百分比显示在进度条中
				bar.innerHTML = result;
			}
			// 发送ajax请求
			xhr.send(formData);
			// 监听服务器端响应给客户端的数据
			xhr.onload = function () {
				// 如果服务器端返回的http状态码为200
				// 说明请求是成功的
				if (xhr.status == 200) {
					// 将服务器端返回的数据显示在控制台中
					var result = JSON.parse(xhr.responseText);
					// 动态创建img标签
					var img = document.createElement('img');
					// 给图片标签设置src属性
					img.src = result.path;
					// 当图片加载完成以后
					img.onload = function () {
						// 将图片显示在页面中
						box.appendChild(img);
					}
				}
			}
			
		}
	</script>
</body>
</html>
```

```javascript
// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
const formidable = require('formidable');
// 创建web服务器
const app = express();

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

app.post('/formData', (req, res) => {
	// 创建formidable表单解析对象
	const form = new formidable.IncomingForm();
	// 解析客户端传递过来的FormData对象
	form.parse(req, (err, fields, files) => {
		res.send(fields);
	});
});

// 实现文件上传的路由
app.post('/upload', (req, res) => {
	// 创建formidable表单解析对象
	const form = new formidable.IncomingForm();
	// 设置客户端上传文件的存储路径
	form.uploadDir = path.join(__dirname, 'public', 'uploads');
	// 保留上传文件的后缀名字
	form.keepExtensions = true;
	// 解析客户端传递过来的FormData对象
	form.parse(req, (err, fields, files) => {
		// 将客户端传递过来的文件地址响应到客户端
		res.send({
			path: files.attrName.path.split('public')[1]
		});
	});
});

// 监听端口
app.listen(3000);
// 控制台提示输出
console.log('服务器启动成功');
```



### 同源政策

- 同源: 两个页面拥有相同的协议、域名和端口
- 非同源地址不能发送Ajax 请求，如果请求，浏览器就会报错。



#### 解决方法

1. jsonp (不属于ajax请求), 只能是get请求

   ```javascript
   function jsonp (options) {
   	// 动态创建script标签
   	var script = document.createElement('script');
   	// 拼接字符串的变量
   	var params = '';
   
   	for (var attr in options.data) {
   		params += '&' + attr + '=' + options.data[attr];
   	}
   	
   	// myJsonp0124741
   	var fnName = 'myJsonp' + Math.random().toString().replace('.', '');
   	// 它已经不是一个全局函数了
   	// 我们要想办法将它变成全局函数
   	window[fnName] = options.success;
   	// 为script标签添加src属性
   	script.src = options.url + '?callback=' + fnName + params;
   	// 将script标签追加到页面中
   	document.body.appendChild(script);
   	// 为script标签添加onload事件
   	script.onload = function () {
   		document.body.removeChild(script);
   	}
   }
   ```

   ```javascript
   app.get('/better', (req, res) => {
   	// 接收客户端传递过来的函数的名称
   	//const fnName = req.query.callback;
   	// 将函数名称对应的函数调用代码返回给客户端
   	//const data = JSON.stringify({name: "张三"});
   	//const result = fnName + '('+ data +')';
   	// setTimeout(() => {
   	// 	res.send(result);
   	// }, 1000)
   	res.jsonp({name: 'lisi', age: 20});
   });
   ```

   ```javascript
   btn.onclick = function () {
       jsonp({
           // 请求地址
           url: 'http://localhost:3001/better',
           success: function (data) {
               console.log(456789)
               console.log(data)
           }
       })
   }
   ```

   

2. CORS (Cross-origin resource sharing) 跨域资源共享, 主要是服务器端设置

   ```javascript
   // 拦截所有请求
   app.use((req, res, next) => {
   	// 1.允许哪些客户端访问我
   	// * 代表允许所有的客户端访问我
   	// 注意：如果跨域请求中涉及到cookie信息传递，值不可以为*号 比如是具体的域名信息
       // res.header('Access-Control-Allow-Origin', '*')
   	res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
   	// 2.允许客户端使用哪些请求方法访问我
   	res.header('Access-Control-Allow-Methods', 'get,post')
   	// 允许客户端发送跨域请求时携带cookie信息
   	res.header('Access-Control-Allow-Credentials', true);
   	next();
   });
   ```

   

3.  服务器中转

   ```
   a浏览器页面 ==>  a服务器 == > b服务器 (请求)
   
   a浏览器页面 <==  a服务器 <==  b服务器 (响应)
   ```

   

