layui.use(['form','layer','jquery'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer
        $ = layui.jquery;

    $(".loginBody .seraph").click(function(){
        layer.msg("功能仍在开发中,敬请期待",{
            time:5000
        });
    })

    //登录按钮
    form.on("submit(login)",function(data){
        if($('#userName').val() =='admin'&&$('#password').val() =='123321'&&$('#code').val() =='jgmxj'){
            $(this).text("登录中...").attr("disabled","disabled").addClass("layui-disabled");
            setTimeout(function(){
                window.location.href = "../../index.html";
            },1000);
        }else{
            layer.msg("账号或密码错误",{
                time:5000
            });
        }
        return false;
    })

    //表单输入效果
    $(".loginBody .input-item").click(function(e){
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })
    $(".loginBody .layui-form-item .layui-input").focus(function(){
        $(this).parent().addClass("layui-input-focus");
    })
    $(".loginBody .layui-form-item .layui-input").blur(function(){
        $(this).parent().removeClass("layui-input-focus");
        if($(this).val() != ''){
            $(this).parent().addClass("layui-input-active");
        }else{
            $(this).parent().removeClass("layui-input-active");
        }
    })
})
