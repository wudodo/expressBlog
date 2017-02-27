var input = e('.bb-input')
input.value = `

![](images/1.png)

# Markdown简介

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— [维基百科](https://zh.wikipedia.org/wiki/Markdown)


# Cmd Markdown 简明语法手册

标签： Cmd-Markdown

---

### 1. 斜体和粗体

使用 * 和 ** 表示斜体和粗体。

示例：

这是 *斜体*，这是 **粗体**。

### 2. 分级标题

使用 === 表示一级标题，使用 --- 表示二级标题。

示例：


这是一个一级标题
============================

这是一个二级标题
--------------------------------------------------

### 这是一个三级标题


你也可以选择在行首加井号表示不同级别的标题 (H1-H6)，例如：# H1, ## H2, ### H3，#### H4。

### 3. 外链接

使用 \[描述](链接地址) 为文字增加外链接。

示例：

这是去往 [百度](http://baidu.com) 的链接。

### 4. 无序列表

使用 *，+，- 表示无序列表。

示例：

- 无序列表项 一
- 无序列表项 二
- 无序列表项 三

### 5. 有序列表

使用数字和点表示有序列表。

示例：

1. 有序列表项 一
2. 有序列表项 二
3. 有序列表项 三

### 6. 文字引用

使用 > 表示文字引用。

示例：

> 野火烧不尽，春风吹又生。




`


var md = new Remarkable()
var content = md.render(input.value)
e('.bb-print').innerHTML = content

input.addEventListener('keyup', function(event){
    var src = input.value
    var content = md.render(src)
    e('.bb-print').innerHTML = content
})


// 把数据 content 存入 数据库 markdown.json
// var fs = require('fs')
// fs.writeFile('markdown.json', function(err){
//     if(err !== null) {
//         log('存储markdown数据出错', err)
//     } else {
//         log('存储markdown数据成功')
//     }
// })
