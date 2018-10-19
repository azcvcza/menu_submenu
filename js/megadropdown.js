$(document).ready(function () {
    var sub = $('#sub')
    var activeRow; //保存主菜单
    var activeMenu; //保存子菜单
    var timer;
    var mouseInSub = false;
    sub.on('mouseenter',function(e){
        mouseInSub = true;
    }).on('mouseleave',function(e){
        mouseInsub = false;
    })
    $('#test').on('mouseenter', function (e) {
        sub.removeClass('none')
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


    })

})