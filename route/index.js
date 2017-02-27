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
    path: '/blog',
    func: function(request, response) {
        var path = 'template/学做blog_index.html'
        sendHtml(path, response)
    }
}

var detali = {
    method: 'get',
    path: '/blog_detail',
    func: function(request, response) {
        var path = 'template/学做blog_detail.html'
        // var path = 'template/web_BBplayer/index.html'
        sendHtml(path, response)
    }
}

var routes = [index, detali]
// exports. 后面的名字随意, 是在外部能够被调用的名字
module.exports.routes = routes