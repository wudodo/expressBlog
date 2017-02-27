/*
目的: 实现一个博客
  博客的功能: 1, 进入主页可以查看所有博文; 2, 在主页可以写新博文; 每条博文下面可以
  写评论;
大致流程:
  后端: 1, 注册路由 API 给前端; 2, 定义 "操作博客" 的 API; 3, 创建数据库
  前端: 1, 写 html
*/
/*
blog 的数据走向:
  1, 前端: 用户在点击 submit button 时, 发生绑定事件: 获取输入的 title author content值,
  用这些值创建一个 object(form), 把这个 object 作为参数传给 blogNew(form), 在blogNew()
  中, 把 form 转成 JSON格式, 作为 data参数 通过 ajax() 发送到后端;
  2, 后端: 通过 api/add 接口接收前端 ajax 发送的 request ,request.body 即为 ajax发送
  的 data ,这时的 data 经过解析就是 在前端生成的那个 object ;
  在 api/add 中, 用 .new(form) 继续将 data(form) 处理: 将 form 的每个 key 的 值
  赋给 ModelBlog ,创建一个新实例 m , m 在 ModelBlog 中比 form 多了个时间, 然后再
  通过计算给 m 加上 id ,这样形成了一个新的 data ,这个 data 就是存在 数据库里的 .

  总结: 前端后端的 blog 数据要包装成 object, 共有的 值 是: title,author,content
  后端得到后经过加工加上了 时间和id 两个属性 .
*/

/*
这是 node 的主文件, 主要作用是:
1, 引入: express等库;
2, 配置: 静态文件目录等;
3, 注册路由(前后端对于不同的网址的反应动作);
4, 设置服务器监听端口;
这个主文件基本只与 route 模块有关联
*/

const log = function() {
    console.log.apply(console, arguments)
}
const express = require('express')
var app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.json())
app.use(express.static('static'))


// 引入 blogAPI.js 模块, 注意路径: 用 ./ 开头
const blog = require('./model/blogAPI.js')

// 注册路由函数
const registerRoutes = function(app, routes) {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        app[route.method](route.path, route.func)
    }
}

// 对访问路径的响应
// var sendHtml = function(path, response) {
//     var fs = require('fs')
//     var options = {
//         encoding: 'utf-8',
//     }
//     fs.readFile(path, options,function(err, data){
//         if(err) {
//             log(err)
//         } else {
//             log(`读取${path}文件成功`)
//             response.send(data)
//         }
//     })
// }
//
// app.get('/', function(request, response){
//     var path = 'template/学做blog_index.html'
//     sendHtml(path, response)
// })

const routeIndex = require('./route/index')
registerRoutes(app, routeIndex.routes)

const routeBlog = require('./route/blog')
registerRoutes(app, routeBlog.routes)

const routeComment = require('./route/comments')
registerRoutes(app, routeComment.routes)

// 注册home主页路由
const routeHome = require('./route/home')
registerRoutes(app, routeHome.routes)

// 主页Markdown路由
const routeMarkdown = require('./route/markdown')
registerRoutes(app, routeMarkdown.routes)


// // 给前端 ajax 的接口
// app.get('/api/all', function(request, response){
//     var blogs = blog.all()
//     var r = JSON.stringify(blogs)
//     response.send(r)
// })
//
// app.post('/api/add', function(req, res){
//     var form = req.body
//     var b = blog.new(form)
//     var r = JSON.stringify(b)
//     res.send(r)
// })

var server = app.listen(80, function(){
    var host = server.address().address
    var port = server.address().port
    console.log('应用实例, 访问地址为 http://%s%s', host, port)
})
