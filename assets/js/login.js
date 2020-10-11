// 入口函数
$(function() {

    // -------------------------------------------------------------------

    // 点击去登录的链接隐藏注册盒子
    $('#link-reg').on('click', function() {
        $('.login-box').hide(),
            $('.reg-box').show()
    })

    // 点击去注册的链接隐藏登录盒子
    $('#link-login').on('click', function() {
        $('.login-box').show(),
            $('.reg-box').hide()
    })

    // ------------------------------------------------------------------

    // 要点:
    // 和jQuery一样 因导入了jquery文件 所以可以以 jQuery 为对象
    // 而因为导入了 layui 的js文件 所以就可以以 layui 对象

    // 从 layui 中获取 form 对象
    var form = layui.form

    // 从 layui 中导入 layer 方法,便于调用 layer 中的 msg 方法
    var layer = layui.layer

    // ------------------------------------------------------------------

    // 通过 form.verify() 函数自定义校验规则
    form.verify({

        // 自定义了一个 pwd 的密码框的的校验规则(正则表达)
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        // 要点:
        // 因为通过形参拿到的是确认密码框中的内容,并且还要拿到密码框中的内容
        // 所以要进行一次 等于 的判断,且如果判断失败,则return一个提示消息即可

        // 校验两次密码输入是否一致的规则
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码输入不一致,请重新输入!'
            }
        }
    })

    // ----------------------------------------------------------------------

    // 监听注册表单的提交事件
    // 绑定提交事件
    $('#form_reg').on('submit', function(e) {

        // 阻止默认提交行为
        e.preventDefault()

        // 发起Ajax的post请求
        var data = {
            username: $('#form_reg [name=username]').val(), // 参数对象
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {

            // 判断是否注册成功
            if (res.status != 0) {

                // 调用layer方法
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录');

            // 模拟人的点击行为,注册成功后用来点击 去登录 链接
            $('#link_login').click()
        })
    })

    // --------------------------------------------------------------------

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {

        // 组织提交默认行为
        e.preventDefault()

        // 发起Ajax的post请求
        $.ajax({
            url: '/api/login',
            type: 'POST',

            // 快速获取表单中的数据
            data: $(this).serialize(),

            success: function(res) {
                // 判断是否登录成功
                if (res.status != 0) {
                    return layer.msg('登陆失败!')
                }
                layer.msg('登录成功')

                // 将登录成功得到的 token 字符串保存到local Storage 中
                // 将 token 值 存入本地存储中   
                localStorage.setItem('token', res.token)

                // 成功后跳转后台主页
                location.href = '/index.html'
            }
        })
    })

    // --------------------------------------------------------------------


})