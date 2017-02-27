// 这里是所有关于 blog 的具体操作函数
var fs = require('fs')

// 数据库路径
var blogsFilePath = 'db/blogs.json'

const ModelBlog = function(form) {
    this.title = form.title || ''
    this.author = form.author || ''
    this.content = form.content || ''
    this.created_time = Math.floor(new Date() / 1000)
}

const loadBlogs = function() {
    var s = fs.readFileSync(blogsFilePath, 'utf8')
    var blogs = JSON.parse(s)
    return blogs
}

var b = {
    data: loadBlogs(),
}

b.all = function() {
    return this.data
}

b.save = function() {
    var s = JSON.stringify(this.data)
    fs.writeFile(blogsFilePath, s, function(err){
        if(err) {
            console.log(err)
        } else {
            console.log('写入${blogsFilePath}成功')
        }
    })
}

b.new = function(form) {
    var m = new ModelBlog(form)
    var d = this.data[this.data.length-1]
    if(d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    var data = this.data
    data.push(m)
    this.save()
}

b.delete = function(id) {
    var ind = id - 1
    this.data.splice(ind, 1)
    for (var i = 0; i < this.data.length; i++) {
        this.data[i].id = i + 1
    }
    this.save()
}


module.exports = b
