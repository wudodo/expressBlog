// const log = function() {
//     console.log.apply(console, arguments)
// }


var ajax = function(request) {
    var r = new XMLHttpRequest
    r.open(request.method, request.path, true)
    if(request.contentType != undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function(event) {
        if(r.readyState == 4) {
            request.callback(r.response)
        }
    }
    if(request.method == 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }

}

var blogTmeplate = function(blog) {
    id = blog.id
    var title = blog.title
    var author = blog.author
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    var t = `
        <div class="blog-cell">
            <div class="blog-infomation">
                <span>${author}</span> @ <time>${time}</time>
            </div>
            <div id="id-div-blog-title">
                <a class="blog-title" href="/blog?id=${id}" data-id ="${id}">
                    ${title}
                </a>
            </div>

            <div class="blog-content">
            </div>


            <div class="blog-comments">
                <div class='new-comment'>
                    <input class='comment-blog-id' type=hidden value="${id}">
                    <input class='comment-author' value="">
                    <input class='comment-content' value="">
                    <button class='comment-add'>添加评论</button>
                </div>
            </div>
            <button class="blog-delete">删除按钮</button>
        </div>
    `
    return t
}

var insertBlogAll = function(blogs) {
    var s = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogTmeplate(blogs[i])
        s += b
    }
    var blogContainer = document.querySelector('.fe20-blogs')
    // blogContainer.innerHTML = s
    appendHtml(blogContainer, s)
}

var blogAll = function() {
    var request = {
        method: 'GET',
        path: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            console.log('all响应', response)
            var blogs = JSON.parse(response)
            // window.blogArray = blogs
            insertBlogAll(blogs)
        }
    }
    ajax(request)
}

var blogNew = function(form) {
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        path: '/api/blog/add',
        contentType: 'application/json',
        data: data,
        callback: function(res) {
            console.log(res)
            blogAll()
        }
    }
    ajax(request)
}

var commentNew = function(form) {
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        path: '/api/comment/add',
        contentType: 'application/json',
        data: data,
        callback: function(res) {
            console.log('响应', res)
        }
    }
    ajax(request)
}



var e = function(selector) {
    return document.querySelector(selector)
}

var bindEvents = function() {
    var button = e('#id-button-submit')
    button.addEventListener('click', function(event){
        var title = e('#id-input-title').value
        var author = e('#id-input-author').value
        var content = e('#id-input-content').value
        var form = {
            title: title,
            author: author,
            content: content,
        }
        blogNew(form)
    })
    // 给 "添加评论"按钮 绑定事件委托
    var blogsDiv = e('.fe20-blogs')
    blogsDiv.addEventListener('click', function(event){
        var target = event.target
        if(target.classList.contains('comment-add')) {
            var p = target.parentElement
            var author = p.querySelector('.comment-author').value
            var content = p.querySelector('.comment-content').value
            var blog_id = p.querySelector('.comment-blog-id').value
            var form = {
                author: author,
                content: content,
                blog_id: blog_id,
            }
            console.log(form)
            commentNew(form)
        }
    })

    // 删除按钮的事件
    blogsDiv.addEventListener('click', function(event){
        var target = event.target
        var p = target.parentElement
        if(target.classList.contains('blog-delete')) {
            p.remove()

            var a = p.querySelector('a')
            var id = parseInt(a.dataset.id)
        }
        var form = {
            id: id
        }
        var data = JSON.stringify(form)

        if(id != null) {
            var request = {
                method: 'POST',
                path: '/api/blog/delete',
                data: data,
                contentType: 'application/json',
                callback: function(response) {
                    console.log("删除成功", response)
                }
            }
            ajax(request)
        }
    })


}
    // 给 "标题" 绑定事件委托
    /*
    1, 取出 id, 找到对应的 blog
    2, 后端注册路由: /blog: 返回 blog_detail页面: 根据 request.query
    决定页面内容
    */
//     blogsDiv.addEventListener('click', function(event){
//         var target = event.target
//         var id = target.dataset.id
//
//     })
// }



// 博客文章内容 Markdown转换
var contentChangeToMd = function() {
    var md = new Remarkable()
    var p = e('.blog-content p')
    var content = p.innerHTML
    content = md.render(content)
    p.innerHTML = content
}



var __main = function() {
    blogAll()
    bindEvents()
    contentChangeToMd()
}

__main()
