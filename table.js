$(document).ready(function(){

    // 奇偶行颜色不同
    // $("#tb tr:odd").addClass("odd");
    // $("#tb tr:even").addClass("even");   

     // 变换背景色, .hover
    $("#tb tr").hover(
        function(){$(this).addClass("hover")},
        function(){$(this).removeClass("hover")}
        )  

    // 为每个单元格增加点击事件，并弹出该单元格行索引和列索引
    //点击#table 的单元格返回 单元格索引
    $("#tb td").click(function () {
        var tdSeq = $(this).parent().find("td").index($(this));
        var trSeq = $(this).parent().parent().find("tr").index($(this).parent());
        console.log("第" + (trSeq+1) + "行，第" + (tdSeq+1) + "列");

        // 先点击编辑后选择checkbox，同样进入编辑状态
        if($(this).find(':checkbox').prop("checked")){
            console.log("checkbox checkbox checkbox...");
            // 查看button状态，如果click就进入编辑模式
            var attr = $(':button[name="edit"]').attr("state");
            console.log(attr);
            if(attr === "clicked")
            {
                console.log("checkbox  and button all clicked...");

                var tdValue = $(this).siblings(".edit");
                console.log(tdValue.length);
                $.each(tdValue, function(i){
                    var td = tdValue[i];
                    console.log(td);

                    // 第二次点击编辑按钮时，如果已经改成input，需要返回
                    console.log($(td).children(':text').val());
                   if($(td).children(':text').val()){return;}
                    var v = $(td).html();
                    console.log(v);
                // 注意引号的包裹
                var input_v = '<input type="text" value="'+v+'">';
                $(td).html(input_v);
                });
            }

        };

    })

    // 当某个单元格有keyup事件的时候，退出编辑状态
    $('#tb td').keyup(function(){
        console.log('quit edit...');
        v = $(':text').val();
        console.log(v);
        $(this).html(v);
    });

    // 回车后，退出编辑状态
    $('#tb td').keydown(function(e){
        if (e.keyCode==13) {
        console.log('enter edit...');
        v = $(':text').val();
        console.log(v);
        $(this).html(v);
        };
    });

        // 双击进入编辑状态
    $('#tb td').dblclick(function(e){
        // 判断是否可以编辑
        if ($(this).hasClass('edit')) {
            console.log('dblclick...');
            v = $(this).html();
            console.log(v);
            // 注意引号的包裹
            var input_v = '<input type="text" value="'+v+'">';
            $(this).html(input_v);
        };
    });



});