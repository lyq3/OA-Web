/*
    扩展layui_tree
**/
layui.define(["element","jquery","tree"],function(exports){
    var element = layui.element,
        $ = layui.$,
        tree=layui.tree;

    MyTree=function (config) {
        this.treeConfig = {
            //tabFilter : "bodyTab",  //添加窗口的filter
            url : undefined  //获取菜单json地址
        }
    }
    MyTree.prototype.init=function(list,id) {
        var layId=new Date().getTime();
        var html= '<div><input type="text" class="layui-input" ><ul style="display:none" id="'+layId+'"></ul></div>';
        var setting={
            elem:"#"+layId,
            nodes:list,
            click:function (node) {
                $("#"+layId).prev().val(node.name);
                $("#"+layId).toggle();
            }
        };
        $("#"+id).html(html);
        tree(setting);
        var ul=$("#"+layId);
        var parent=$("#"+id);
        parent.find('.layui-input').click(function () {
                        showMenu()
        });

        function showMenu(obj) {
            if((ul.is(":visible"))){
                return;
            }else {
                ul.show();
                $("body").bind("mousedown", onBodyDown);
            }
        }
        function hideMenu() {
            ul.hide();
            $("body").unbind("mousedown", onBodyDown);
        }

        function onBodyDown(event) {
            if (!(
                    event.target.tagName=='I'||
                    event.target.tagName=='LI'||
                    event.target.tagName=='CITE'||
                    event.target.tagName=='A')) {
               hideMenu();
            }
        }
    }

    //参数设置
    MyTree.prototype.set = function(option) {
        var _this = this;
        $.extend(true, _this.treeConfig, option);
        return _this;
    };
    var mytree = new MyTree();
    exports("inputTree",mytree
    );
});