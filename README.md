# 1tech1page
using one tech make one page to practice html, css and javascript skills, with detail descriptions.

1. jquery-table

## 参考

先把参考链接写在前面吧，以示尊重！

http://www.php100.com/manual/jquery/
http://tool.oschina.net/apidocs/apidoc?api=jquery

http://www.cnblogs.com/lxblog/archive/2013/01/11/2856582.html

http://www.jb51.net/article/28074.htm



## 主要知识点

- table的各种编辑
--    // 第二次点击编辑按钮时，如果已经改成input，需要返回
-- // 取消时候也要退出编辑状态

- 筛选某元素的兄弟姐妹
- each循环
- 键盘与鼠标相应事件

## 使用函数

    hover([over,]out)

概述
一个模仿悬停事件（鼠标移动到一个对象上面及移出这个对象）的方法。这是一个自定义的方法，它为频繁使用的任务提供了一种“保持在其中”的状态。
当鼠标移动到一个匹配的元素上面时，会触发指定的第一个函数。当鼠标移出这个元素时，会触发指定的第二个函数。而且，会伴随着对鼠标是否仍然处在特定元素中的检测（例如，处在div中的图像），如果是，则会继续保持“悬停”状态，而不触发移出事件（修正了使用mouseout事件的一个常见错误）。

    // 变换背景色, .hover
    $("#tb tr").hover(
        function(){$(this).addClass("hover")},
        function(){$(this).removeClass("hover")}
        )


## 按钮操作主要函数

        <script>
        //  selected all
        function checkAll(){

            $("#tb").find(':checkbox').prop("checked", true);
        }
        // cancel all
        function checkCancel(){
            $('#tb').find(":checkbox").each(function(){

           // 这里指的是第一个td里的checkbox，需要父辈才是td，再根据edit找需要编辑的td
            if ($(this).prop('checked')) {
                var tdValue = $(this).parent().siblings(".edit");
                console.log(tdValue.length);
                $.each(tdValue, function(i){
                    var td = tdValue[i];
                    console.log(td);
                    // 取消时候也要退出编辑状态
                    var v = $(td).children(':text').val();
                    console.log(v);
                    $(td).html(v);
                });
            }
                });
            $("#tb").find(':checkbox').prop("checked", false);

                    // change edit button style
           $(this).parent().find(':button[name"edit"]').attr({state:"unClicked"});
           $(this).parent().find(':button[name="edit"]').css({"background-color": "gray"});
        }
        // reverse selected
        function checkReverse(){
            // 使用each循环每一个checkbox是否选择，然后true或者false的属性取反赋值给自己
            $("#tb").find(':checkbox').each(function(){
                $(this).prop("checked", !$(this).prop("checked"));
            })
        }
        //edit the checked line or lines
        function edit(ths){
            var attr = $(ths).attr("state");
            console.log(attr);
            if(attr === "unClicked")
            {
               $(ths).attr({state:"clicked"});
               $(ths).css({"background-color": "yellow"});

            }
            else
            {
               $(ths).attr({state:"unClicked"});
               $(ths).css({"background-color": "gray"});
            }
            console.log($(ths).attr("state"));

            $('#tb').find(":checkbox").each(function(){
                // find checked, then find next 3 td, make to input label
                console.log($(this).prop('checked'));
                // 这里指的是第一个td里的checkbox，需要父辈才是td，再根据edit找需要编辑的td
                if ($(this).prop('checked')) {
                    var tdValue = $(this).parent().siblings(".edit");
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
                    // 获取table1,第2个tr的第2个td的值。=2
                    // var v = $('#tb tr:eq(1) td:nth-child(2)').html();
                    // console.log(v);
                    // // 注意引号的包裹
                    // var input_v = '<input type="text" value="'+v+'">';
                    // $('#tb tr:eq(1) td:nth-child(2)').html(input_v);
                }

            });
        }


        // add row
        function addRow(){
            //行号是从0开始， 故减去1
            var rownum=$("#tb tr").length-1;
            var chk="<input type='checkbox' id='chk_"+rownum+"' name='chk_"+rownum+"'/>";
            var text="<input type='text' id='txt_"+rownum+"' name='txt_"+rownum+"' width='75px'/>";
            var sel="<select id='sel_"+rownum+"'><option value='1'>停止</option><option value='0'>启动</option></select>";
            var row="<tr><td>"+chk+"</td><td>"+text+"</td><td>"+text+"</td><td>"+text+"</td><td>"+sel+"</td><td>"+text+"</td></tr>";
            $(row).insertAfter($("#tb tr:eq("+rownum+")"));   
        }  

        // del row
        function delRow(){
             $("#tb tr").each(function(i){
                 var chk=$(this).find("input[type='checkbox']");
                 if(chk.prop("checked")){
                    console.log('find del line');
                   $(this).remove();
                 }
              });
          }
       
    </script>
