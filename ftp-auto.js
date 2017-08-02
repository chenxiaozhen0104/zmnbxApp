var fs = require('fs')
var Client = require('ftp');




var c = new Client();
console.log('程序开始运行')
fs.watch(__dirname + '/dist', function () {
    try {
        upload()
    } catch (error) {
        
    }
    
})
function upload() {
    c.on('ready', function () {
        console.log('开始上传')
        c.put(__dirname + '/dist/app.web.js', 'app.web.js', function (err) {
            console.log('上传成功')
            c.end()
        });
    });
    // connect to localhost:21 as anonymous
    c.connect({
        host: '192.168.1.240',
        user: 'dev',
        password: '123456'
    });
}
