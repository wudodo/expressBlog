// const log = function() {
//     console.log.apply(console, arguments)
// }

// 导航栏跳转 SPA
var navigatorToPage = function() {

}


// 滚动条事件：当向下滚动时，header 高度缩小；当滚回
// 顶部时，导航栏恢复原状。
var bindNavigatorChange = function() {
    // onscroll 是滚动条发生变化的事件，不管是滑动还是点击都能监听到
    window.onscroll = function(event) {
        // log(document.body.scrollTop)

        if(document.body.scrollTop > 0) {
      
            e('#id-div-nav').classList.add('header-height-change')
            e('#id-a-logo').classList.add('logo-size-change')
        }
        if(document.body.scrollTop == 0) {
            e('#id-div-nav').classList.remove('header-height-change')
            e('#id-a-logo').classList.remove('logo-size-change')
        }
    }
}
bindNavigatorChange()

// 技能栏弹窗事件
var bindSkillAlert = function() {
    var selector = '.personal-skill-detail'
    bindAll(selector, 'click', function(event){
        var elements = es('.skill-alert')
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add('bb-hide')
        }

        var id = event.target.dataset.id
        var alert = e(`#id-div-alert-${id}`)
        alert.classList.remove('bb-hide')

        alert.style.opacity = 0
        // 通过定时器延迟执行渲染，让transition能够生效
        setTimeout(function(){
            alert.style.opacity = 1
        }, 10)
    })
}
bindSkillAlert()

// 由个人信息过渡到技能栏事件
var bindPersonalTab = function() {
    var toggle = e('#id-a-skill')
    bindEvent(toggle, 'click', function(event){
        var info = e('.bb-personal-infomation')
        toggleClass(info, 'bb-hide')

        var item = e('.bb-personal-skill-item')
        toggleClass(item, 'bb-hide')
    })
}
bindPersonalTab()
