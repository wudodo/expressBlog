// 这里是所有关于 comment 的具体操作函数
var fs = require('fs')
console.log('777')
var commentsFilePath = 'db/comment.json'

const ModelComment = function(form) {
    this.author = form.author || ''
    this.content = form.content || ''
    this.created_time = Math.floor(new Date() / 1000)
    this.blog_id = form.blog_id
}

const loadComments = function() {
    var s = fs.readFileSync(commentsFilePath, 'utf8')
    if(s !== undefined) {
        var comments = JSON.parse(s)
        return comments
    } else {
        return
    }
}

var c = {
    data: loadComments(),
}

c.all = function() {
    return this.data
}

c.save = function() {
    var s = JSON.stringify(this.data)
    fs.writeFile(commentsFilePath, s, function(err){
        if(err) {
            console.log(err)
        } else {
            console.log('写入${commentsFilePath}成功')
        }
    })
}

c.new = function(form) {
    var m = new ModelComment(form)
    console.log('m',m)
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



module.exports = c
