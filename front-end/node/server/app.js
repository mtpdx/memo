const http = require('http');
const url = require('url');
const app = http.createServer();

app.on('request', (req, res)=>{
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);

    res.writeHead(200, {
		'content-type': 'text/html;charset=utf8'
    });
    
    res.end('<p>hello node server</p>');
});

app.listen(3000);

console.log('server boot success');
