$(document).ready(function () {
    var sub = $('#sub')
    var activeRow; //保存主菜单
    var activeMenu; //保存子菜单
    var timer;
    var mouseInSub = false;

    var mouseTrack = [];
    sub.on('mouseenter',function(e){
        mouseInSub = true;
    }).on('mouseleave',function(e){
        mouseInsub = false;
    })

    

    var moveHandler = function(e){
        mouseTrack.push({
            x:e.pageX,
            y:e.pageY
        });
        if(mouseTrack.length>3){
            mouseTrack.shift();
        }
    }
    $('#test').on('mouseenter', function (e) {
        sub.removeClass('none')
        $(document).bind('mousemove',moveHandler)
    }).on('mouseleave', function (e) {
        sub.addClass('none')
        if (activeRow) {
            activeRow.removeClass('active')
            activeRow = null
        }
        if (activeMenu) {
            activeMenu.addClass('none')
            activeMenu = null;
        }
        $(document).unbind('mousemove',moveHandler);
    }).on('mouseenter', 'li', function (e) {
        if (!activeRow) {
            activeRow = $(e.target).addClass('active');
            activeMenu = $('#' + activeRow.data('id'));
            activeMenu.removeClass('none');
            return
        }
        if(timer){
            clearTimeout(timer);//做一个debounce
        }
        
        var currMousePos = mouseTrack[mouseTrack.length-1];
        var leftCorner = mouseTrack[mouseTrack.length-2];
        console.log("currMousePos",currMousePos,"leftCorner",leftCorner);
        var delay = needDelay(sub,leftCorner,currMousePos)

        if(delay){
            timer = setTimeout(function () {
                if(mouseInSub){
                    return 
                }
                activeRow.removeClass("active")
                activeMenu.addClass('none')
                activeRow = $(e.target);
                activeRow.addClass('active');
                activeMenu = $('#' + activeRow.data('id'));
                activeMenu.removeClass('none');
    
                timer =null;
            }, 100)
        }else{
            var prevActiveRow = activeRow;
            var prevActiveMenu = activeMenu;

            activeRow =$(e.target);
            activeMenu = $('#'+activeRow.data('id'));
            prevActiveRow.removeClass('active');
            prevActiveMenu.addClass('none');

            activeRow.addClass('active');
            activeMenu.removeClass('none');
        }
    })

})