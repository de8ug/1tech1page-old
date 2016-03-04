
STATUS = [
{'id': 1, 'text': "在线"},
{'id': 2, 'text': "下线"}
];

BUSINESS = [
{'id': 1, 'text': "运维"},
{'id': 2, 'text': "销售"},
{'id': 3, 'text': "开发"}
];

//console.log(STATUS);
//console.log(window['STATUS']);



function CheckAll(mode, tb){
// 1、选中checkbox
// 2、如果已经进入编辑模式，让选中行进入编辑状态
// tb = #tb1
//$(tb) = $('#tb1')
$(tb).children().each(function(){
    // $(this) 表示循环过程中,每一个tr，每一行数据
    var tr = $(this);
    var isChecked = $(this).find(':checkbox').prop('checked');
    if(isChecked==true){
    }else{
        $(this).find(':checkbox').prop('checked',true);
        // 如果已经进入编辑模式，让选中行进入编辑状态
        var isEditMode = $(mode).hasClass('editing');
        if(isEditMode){
            // 当前行进入编辑状态
            RowIntoEditMode(tr);
        }
    }
});
}

function CheckReverse(mode, tb){
// 是否进入了编辑模式
if($(mode).hasClass('editing')){
    $(tb).children().each(function(){
        // 遍历所有tr
        var tr = $(this);
        var check_box = tr.children().first().find(':checkbox');
        if(check_box.prop('checked')){
            check_box.prop('checked',false);
            RowOutEditMode(tr);

        }else{
            check_box.prop('checked',true);
            RowIntoEditMode(tr);
        }
    });
}else{
    //
    $(tb).children().each(function(){
        var tr = $(this);
        var check_box = tr.children().first().find(':checkbox');
        if(check_box.prop('checked')){
            check_box.prop('checked',false);
        }else{
            check_box.prop('checked',true);
        }
    });
}
}

function CheckCancel(mode, tb){
// 1、取消选中checkbox
// 2、如果已经进入编辑模式，行推出编辑状态
$(tb).children().each(function(){
    var tr = $(this);
    if(tr.find(':checkbox').prop('checked')){
        // 移除选中
        tr.find(':checkbox').prop('checked', false);

        var isEditing = $(mode).hasClass('editing');
        if(isEditing == true){
            // 当前行，推出编辑状态
            RowOutEditMode(tr);
        }
    }

});
}

function EditMode(ths, tb){
// ths =this,
var isEditing = $(ths).hasClass('editing');
if(isEditing){
    // 退出编辑模式
    $(ths).text('进入编辑模式');
    $(ths).removeClass('editing');
    $(tb).children().each(function(){
        var tr = $(this);
        if(tr.find(':checkbox').prop('checked')){
            // 当前行，推出编辑状态
            RowOutEditMode(tr);
        }
    });
}else{
    // 进入编辑模式
    $(ths).text('退出编辑模式');
    $(ths).addClass('editing');
    $(tb).children().each(function(){
        // $(this) 表示循环过程中,每一个tr，每一行数据
        var tr = $(this);
        var isChecked = $(this).find(':checkbox').prop('checked');
        if(isChecked==true){
            // 当前行进入编辑状态
            RowIntoEditMode(tr);
        }
    });
}
}


function  RowOutEditMode(tr){
        tr.children('[edit="true"]').each(function(){
    // every td with edit =true
    var td = $(this);
    console.log(td.html());
    var v = td.children(':first').val();
    td.text(v);
});
}

function RowIntoEditMode(tr){
        tr.children().each(function(){
    var td = $(this);
    if (td.attr('edit') == 'true') {
        if(td.attr('edit-type') == "select"){
            var all_values = window[td.attr('global-key')];
            var select_val = td.attr('select_val');
            select_val = parseInt(select_val);
            var options = "";
            $.each(all_values, function(index, value){
                if(select_val == value.id){
                    options += "<option selected='selected' >" + value.text +   "</option>";
                }else{
                    options += "<option>" + value.text + "</option>";
                }
            });
                var temp = "<select>" + options + "</select>";
                td.html(temp);
        }else{
        var text = td.text();
        console.log(text);
        var temp = "<input type='text'  value='  "   +  text +" '  />  ";
        td.html(temp);   
    }
    }
});
}

// jquery bind function
$(function(){
    // checkbox first, then my own
    $('#tb1').find(':checkbox').click(function(){
        var tr = $(this).parent().parent();
        if($('#edit_mode').hasClass('editing')){
            if($(this).prop('checked')){
                RowIntoEditMode(tr);
            }else{
                RowOutEditMode(tr);
            }

        }
    });
});