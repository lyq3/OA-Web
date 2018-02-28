/*
    扩展layui_tree
**/
layui.define(["element","jquery"],function(exports){
    var element = layui.element,
        $ = layui.$,
        tree=layui.tree;

        Tree=function (config) {
            this.treeConfig = {
                //tabFilter : "bodyTab",  //添加窗口的filter
                url : undefined  //获取菜单json地址
            }
        }
    Tree.prototype.init=function (list,id) {
        var html= '<div><input type="text" class="layui-input" ><ul style="display:none" id="'+id+'"></ul></div>';
        var setting={
            elem:"#"+id,
            nodes:list,
            click:function (node) {
                $("#"+id).prv().val(node.name);
                $("#"+id).hide();
            }
        };
        tree(setting);
        return
    }    
    var tree = new Tree();
    exports("tree",function(option){
        return tree;
    });
});