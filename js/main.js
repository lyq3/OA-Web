
layui.use(['form','element','layer','jquery','carousel'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        element = layui.element,
        carousel = layui.carousel;
    $ = layui.jquery;
    //icon动画
    $(".panel a").hover(function(){
        $(this).find(".layui-anim").addClass("layui-anim-scaleSpring");
    },function(){
        $(this).find(".layui-anim").removeClass("layui-anim-scaleSpring");
    })
    $(".panel a").click(function(){
        parent.addTab($(this));
    })
    //系统基本参数
    if(window.sessionStorage.getItem("systemParameter")){
        var systemParameter = JSON.parse(window.sessionStorage.getItem("systemParameter"));
        fillParameter(systemParameter);
    }else{
        $.ajax({
            url : "../json/systemParameter.json",
            type : "get",
            dataType : "json",
            success : function(data){
                fillParameter(data);
            }
        })
    }
    //填充数据方法
    function fillParameter(data){
        //判断字段数据是否存在
        function nullData(data){
            if(data == '' || data == "undefined"){
                return "未定义";
            }else{
                return data;
            }
        }
        $(".version").text(nullData(data.version));      //当前版本
        $(".author").text(nullData(data.author));        //开发作者
        $(".homePage").text(nullData(data.homePage));    //网站首页
        $(".server").text(nullData(data.server));        //服务器环境
        $(".dataBase").text(nullData(data.dataBase));    //数据库版本
        $(".maxUpload").text(nullData(data.maxUpload));    //最大上传限制
        $(".userRights").text(nullData(data.userRights));//当前用户权限
    }

    //最新文章列表
    $.get("../json/newsList.json",function(data){
        var hotNewsHtml = '';
        for(var i=0;i<5;i++){
            hotNewsHtml += '<tr>'
                +'<td align="left"><a href="javascript:;"> '+data.data[i].newsName+'</a></td>'
                +'<td>'+data.data[i].newsTime.substring(0,10)+'</td>'
                +'</tr>';
        }
        $(".hot_news").html(hotNewsHtml);
        $(".userAll span").text(data.length);
    })

    //用户数量
    $.get("../json/userList.json",function(data){
        $(".userAll span").text(data.count);
    })

    //外部图标
    $.get(iconUrl,function(data){
        $(".outIcons span").text(data.split(".icon-").length-1);
    })

    //轮播图
    carousel.render({
        elem: '#test1'
        ,width: '100%' //设置容器宽度
        ,arrow: 'always' //始终显示箭头
        //,anim: 'updown' //切换动画方式
    });
})
