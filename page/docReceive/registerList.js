layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#registerList',
        url : '../../json/registerList.json',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limit : 20,
        limits : [10,15,20,25],
        cols : [[
            // {type: "checkbox", fixed:"left", width:50},
            {field: 'ID', title: 'ID', hidden:true},
            {field: 'registerStatus', title: '状态', width:80, align:'center',templet:"#registerStatus"},
            {field: 'type', title: '类型', width:80, align:"center"},
            {field: 'registNo', title: '收文号', width:80, align:"center"},
            {field: 'sponsor', title: '主办单位', width:200},
            {field: 'sponsorNo', title: '主办号', align:'center', minWidth:200, templet:function(d){
                return "城工信发（2018）2号";
            }},
            {field: 'registTitle', title: '公文标题',minWidth:350, align:'center'},
            {field: 'registTime', title: '来文时间', align:'center', minWidth:110, templet:function(d){
                return d.registTime.substring(0,10);
            }},
            {field: 'limitTime', title: '限办时间',minWidth:110, align:'center'},
            {field: 'comments', title: '备注',minWidth:20, align:'center'}
        ]]
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        var param = {}
        if($(".searchVal").val() !== ''){
            param.registNo = $(".searchVal").val()
        }
        if($("#registNo").val() !== ''){
            param.registNo = $("#registNo").val()
        }
        if($("#registerStatusSearch").val() !== ''){
            param.registerStatus = $("#registerStatusSearch").val()
        }
        table.reload("newsListTable",{
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: param
        })
    });

    //添加文章
    function addNews(edit){
        var index = layui.layer.open({
            title : "添加文章",
            type : 2,
            content : "newsAdd.html",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    body.find(".newsName").val(edit.newsName);
                    body.find(".abstract").val(edit.abstract);
                    body.find(".thumbImg").attr("src",edit.newsImg);
                    body.find("#news_content").val(edit.content);
                    body.find(".newsStatus select").val(edit.newsStatus);
                    body.find(".openness input[name='openness'][title='"+edit.newsLook+"']").prop("checked","checked");
                    body.find(".newsTop input[name='newsTop']").prop("checked",edit.newsTop);
                    form.render();
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(index);
        })
    }
    $(".addNews_btn").click(function(){
        addNews();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('newsListTable'),
            data = checkStatus.data,
            newsId = [];
        if(data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].newsId);
            }
            layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
                // $.get("删除文章接口",{
                //     newsId : newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            })
        }else{
            layer.msg("请选择需要删除的文章");
        }
    })

    //列表操作
    table.on('tool(registerList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            addNews(data);
        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此文章？',{icon:3, title:'提示信息'},function(index){
                // $.get("删除文章接口",{
                //     newsId : data.newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                    tableIns.reload();
                    layer.close(index);
                // })
            });
        } else if(layEvent === 'look'){ //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
        }
    });

})