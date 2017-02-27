const blog = require('../model/blogAPI')

var add = {
    method: 'post',
    path: '/api/blog/add',
    func: function(req, res) {
        var form = req.body
        console.log(req.body)
        blog.new(form)
        var r = JSON.stringify('haha')
        console.log(r)
        res.send(r)
    }
}

var dele = {
    method: 'post',
    path: '/api/blog/delete',
    func: function(req, res) {
        var id = req.body.id
        console.log(id)
        blog.delete(id)
    }
}

var all = {
    method: 'get',
    path: '/api/blog/all',
    func: function(request, response) {
        var blogs = blog.all()
        var r = JSON.stringify(blogs)
        response.send(r)
    }
}

var routes = [add, all, dele]
// exports. 后面的名字随意, 是在外部能够被调用的名字
module.exports.routes = routes
