// 要点:每次调用 $.get() 或 $.post()  或 $.ajax() 的时候
// 会先调用 ajaxPrefilter 这个函数
// 并且在这个函数中,可以拿到我们给Ajax提供的配置对象

$.ajaxPrefilter(function(options) {

    // 在发起真正的Ajax请求之前,统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 统一为有权限的接口设置 headers 请求头
    // 判断统一请求路径是否加了 my
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };

    // 全局统一配置 complete 回调函数
    options.complete = function(res) {
        // 在complete 回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
        // 判断用户不登陆的情况
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空 token
            localStorage.removeItem('token')
                // 强制跳转主页
            location.href = '/login.html'
        }
    }
})