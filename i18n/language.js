$(function(){
    //检测语言
    var default_language = "";//默认为中文
    var a = $.cookie('language');
    if(a == "zw"){ //如果为藏文则切换
        default_language = "zw";
    }
    //设置语言
    loadProperties();
    function loadProperties() {
        $.i18n.properties({
            name:'strings',    //属性文件名     命名格式： 文件名_国家代号.properties
            path:'i18n/',   //注意这里路径是你属性文件的所在文件夹
            mode:'map',
            language:default_language,     //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties
            callback:function(){
                $("[data-locale]").each(function(){
                    console.log($(this).data("locale"));
                    $(this).html($.i18n.prop($(this).data("locale")));

                });
            }
        });
    }
    //绑定切换语言事件

        $("#change_language").click(function(){
            var current_language = "";
            var a = $.cookie('language');
            if(a == "zw"){ //如果为藏文则切换
                current_language = "";
            } else {
                current_language = "zw";
            }
            $.cookie('language', current_language, { expires: 7,path:"/" });
            window.location.reload();
        });
    })