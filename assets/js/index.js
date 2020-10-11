$(function() {

    // 调用函数，获取用户基本信息
    getUserInfo()

    var layer = layui.layer

    // -------------------------------------------------------

    // 点击按钮，实现退出功能
    // 注册点击事件
    $('#btnlogout').on('click', function() {
        //提示用户是否退出
        layer.confirm('是否退出登录？', { icon: 3, title: '提示' }, function(index) {
            // 清空本地储存中的 token
            localStorage.removeItem('token')
                //重新跳转到登录页面
            location.href = '/login.html'
                // 用来关闭询问框的
            layer.close(index);
        });
    })

})

// ---------------------------------------------------------

// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        // headers就是请求头配置对象(已加入到baseAPI.js通用文件)
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },

        // 判断获取用户信息是否成功
        success: function(res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 rederAvatar 渲染用户的头像
            renderAvatar(res.data);
        }

        // 不论登录是否成功都会调用complete函数(已加入到baseAPI.js通用文件)
        // complete: function(res) {
        //     // 在complete 回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
        //     // 判断用户不登陆的情况
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空 token
        //         localStorage.removeItem('token')
        //             // 强制跳转主页
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// ---------------------------------------------------------------

// 渲染用户头像
function renderAvatar(user) {
    // 判断用户是否有昵称 
    var name = user.nickname || user.username
        // 渲染 欢迎 的文本
    $('#welcome').html('欢迎&nbsp;' + name)
        // 按需渲染用户的头像
    if (user.user_pic != null) {
        // 渲染图片头像并隐藏文本头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('text-avatar').hide()
    } else {
        // 渲染文本头像 并隐藏图片头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('text-vaatar').html(first).show()
    }
}

// ----------------------------------------------------------------