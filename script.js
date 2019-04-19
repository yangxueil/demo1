function accordion(id, option) {
    var p = document.getElementById(id);
    //配置原始信息
    var defaultOption = {
        Active_Width: 400,
        Active_Height: 350,
        Small_Width: 130,
        Small_Height: 40,
        time:300
    };
    //Object.assign({},obj1,obj2,...),整合用户信息与配置原始值
    //注意 {}后面的对象越后面的会覆盖前面的
    var lt = Object.assign({}, defaultOption, option);
    if (lt.col * lt.row != p.children.length) {
        throw 'option is not ' + p.children.length;
    }
    p.style.width=lt.Active_Width+lt.Small_Width*(lt.col-1)+"px";

    var time1=new Date().getTime();
    var timer=null;
    function auto(index) {
        clearTimeout(timer);
    var time2=new Date().getTime();
    if(time2-time1<lt.time){
        timer=setTimeout(function(){
          auto(index);
        },lt.time);
        return false;
    }
     time1=time2;
        var cx = index % lt.col;
        var cy = Math.floor(index / lt.col);
        // console.log(cx,cy);
        for (var x = 0; x < lt.col; x++) {
            for (var y = 0; y < lt.row; y++) {
                // console.log(x, y);
                var index_ = x + y * lt.col;
                // console.log(index_);
                var item = p.children[index_];
                // console.log(item);
                if (cx == x && cy == y) {
                    item.style.width = lt.Active_Width + "px";
                    item.style.height = lt.Active_Height + "px";
                } else if (cx == x) {
                    item.style.width = lt.Active_Width + "px";
                    item.style.height = lt.Small_Height + "px";
                } else if (cy == y) {
                    item.style.height = lt.Active_Height + "px";
                    item.style.width = lt.Small_Width + "px";
                }
                else {
                    item.style.height = lt.Small_Height + "px";
                    item.style.width = lt.Small_Width + "px";
                }
            }
        }
    }
    auto(0);
  //   for(var i=0;i<p.children.length;i++){
  //       (function(index){
  //           p.children[index].onmouseenter=function(){
  //               auto(index);
  //           }
  //       })(i)
    for(var i=0;i<p.children.length;i++){
        p.children[i].in=i;
        p.children[i].style.transition=" all"+lt.time/1000+"s";
        p.children[i].onmouseenter=function(){
            auto(this.in);
        };
    }
}
