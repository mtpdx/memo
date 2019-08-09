const fs = require('fs');
const path = require('path');

fs.readFile('./系统模块.md', 'utf-8', (err, data) => {
    console.log(err);
    console.log(data);

});

// fs.writeFile('./write_demo.txt', 'file content', err => {
//     if (err != null) {
//         console.log(err);
//         return;
//     }
//     console.log('文件写入成功');

// });

const finalPath = path.join('public', 'uploads', 'avatar');
console.log(finalPath);


console.log(__dirname);