// const blog = require('../model/学做blog.js')

var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8',
    }
    fs.readFile(path, options,function(err, data){
        if(err) {
            console.log(err)
        } else {
            console.log('读取本地网页index文件成功')
            response.send(data)
        }
    })
}

var index = {
    method: 'get',
    path: '/markdown',
    func: function(request, response) {
        var path = 'template/markdown.html'
        sendHtml(path, response)
    }
}


var routes = [index]
// exports. 后面的名字随意, 是在外部能够被调用的名字
module.exports.routes = routes
