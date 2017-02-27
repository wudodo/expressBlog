const comment = require('../model/学做comments')

var add = {
    method: 'post',
    path: '/api/comment/add',
    func: function(req, res) {
        var form = req.body
        var b = comment.new(form)
        var r = JSON.stringify(b)
        res.send(r)
    }
}

var all = {
    method: 'get',
    path: '/api/comment/all',
    func: function(request, response) {
        var comments = comment.all()
        var r = JSON.stringify(comments)
        response.send(r)
    }
}

var routes = [add, all]
// exports. 后面的名字随意, 是在外部能够被调用的名字
module.exports.routes = routes
