/**
 * Created by mazhiyi on 16/7/25.
 */

/*-------------------------------------filepart-------------------------------------------*/
var FileNum = 0;
$(document).ready(function(){
            $(".file_upload_3").change(function() {
                var filepath = $(".file_upload_3").val();
                //alert(filepath);
                var filename = filepath.slice(filepath.lastIndexOf('/') + 1);

                var newElems = document.createElement("div");
                newElems.classList.add("E_File");
                newElems.id = "file" + FileNum;

                $("#examplelist").prepend(newElems);
                var e1 = newElems.id;
                newElems = document.createElement("div");
                newElems.classList.add("E_File_Name");
                newElems.id = "examplename" + FileNum;
                newElems.textContent = filename;
                $("#"+e1).prepend(newElems);
                var e2 = newElems.id;
                newElems = document.createElement("button");
                newElems.classList.add("E_File_plus");
                newElems.id = "exampleplus" + FileNum;
                $("#"+e1).prepend(newElems);
                var e3 = newElems.id;
                newElems = document.createElement("div");
                newElems.classList.add("pathNameStorage");
                newElems.id = "pathNameStorage" + FileNum;
                $("#"+e1).append(newElems);
                newElems.textContent = filepath;
                var e4 = newElems.id;

                FileNum++;

            });
});


$(document).ready(function(){
    $(document).on("click",".E_File_plus",function(event){
        var filepath =$(this).parent().children(".pathNameStorage").text();
        var data = fs.readFileSync(filepath,"utf-8");
        var receive = data.toString();
        //alert("receive:\n"+receive);

        //current timeline;
        var s = $(".CurrentTime").val() * 60;

        while(receive.length>0){
            //slice the file
            var block_info = receive.slice(receive.indexOf('@')+1,receive.indexOf('#')); //获得子字符串
            receive = receive.slice(receive.indexOf('#')+1); //裁剪字符串
            //alert("blockinfo:"+block_info)
            //alert("剩下receive:"+receive)

            //根据block_info 创建BLOCK
            var newElems = document.createElement("div");  //新建div
            newElems.style.position = "absolute";
            newElems.classList.add("block");

            //Classname
            var temp = block_info.slice(block_info.indexOf('@')+1,block_info.indexOf('|'));
            newElems.classList.add(temp);
            block_info = block_info.slice(block_info.indexOf('|')+1); //delete classname
            //alert("className:"+temp)

            //path
            var path;
            if(temp == "block_a_sound"||temp =="block_b_sound"||temp =="block_c_sound"||temp =="block_BG_sound"){
                temp = block_info.slice(block_info.indexOf('@')+1,block_info.indexOf('|'));
                path = temp;
                block_info = block_info.slice(block_info.indexOf('|')+1); //delete path

            }

            //id
            newElems.id = "block_"+blockNum;
            blockNum++;
            temp = block_info.slice(0,block_info.indexOf('|'));
            block_info = block_info.slice(block_info.indexOf('|')+1); //delete id
            //alert("id:"+temp)

            //ACTION
            var action = block_info.slice(0,block_info.indexOf('|'));
            block_info = block_info.slice(block_info.indexOf('|')+1); //delete action
            //alert("ACTION:"+action)

            //TIME
            var time = block_info.slice(0,block_info.indexOf('|'));
            block_info = block_info.slice(block_info.indexOf('|')+1); //delete time
            //alert("TIME:"+time)

            //放置BLOCK 父类名字
            temp = block_info.slice(0,block_info.indexOf('|'));
            $("."+temp).prepend(newElems);
            block_info = block_info.slice(block_info.indexOf('|')+1); //delete PAREENT
            //alert("PARENT:"+temp)

            //LEFT
            temp = block_info.slice(0,block_info.indexOf('|'));
            temp = parseFloat(s) + parseFloat(temp); //根据起始位置
            newElems.style.left = temp + "px";
            block_info = block_info.slice(block_info.indexOf('|')+1); //delete left
            //alert("LEFT:"+temp)

            //length
            temp = block_info.slice(0,block_info.indexOf('|'));
            newElems.style.width = temp + "px";
            block_info = block_info.slice(block_info.indexOf('|')+1); //delete length
            //alert("LENGTH:"+temp)


            //Inside
            //加上动作时长部分
            var newblock = $("#" + newElems.id);
            var newT0 = document.createElement("div");
            var newT1 = document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            newblock.append(newT);
            newblock.children("div").append(newT1);
            newblock.children("div").prepend(newT0);//将子结构放入DIV
            newT0.textContent = action;
            newT1.textContent = time;

            //Path
            var newPath = document.createElement("div");
            newPath.classList.add("pathNameStorage2");
            $("#"+newElems.id).append(newPath);
            newPath.textContent = path;

            //加上控制部分

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            newblock.prepend(newButtons0);
            newblock.append(newButtons1);    //将子结构放入DIV

        }

        makeOrder();
    });
});


/*-------------------------------------example1_waving------------------------------------*/
$(document).ready(function () {
        $(".Wave_plus").click(
            function() {
                
                //------------------------LeftHand_up0--------------------------
            var newElems = document.createElement("div");
            var st = $(".LHInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".lefthand_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+15;//延时15
            newElems.style.left = p + "px";         // 位置

            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3).toFixed(2) + "s"
            newT0.textContent = "50"+"°";
            newT1.textContent = length;
                
            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;

            //-----------------------LeftHand_down0-----------------------
            var newElems = document.createElement("div");
            var st = $(".LHInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".lefthand_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+15+85;
            newElems.style.left = p + "px";         // 位置

            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3).toFixed(2) + "s"
            newT0.textContent = "-40"+"°";
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV
            blockNum++;
                
            //------------------------LeftHand_up1-------------------------------
            var newElems = document.createElement("div");
            var st = $(".LHInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".lefthand_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+15+170;
            newElems.style.left = p + "px";         // 位置

            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3).toFixed(2) + "s"
            newT0.textContent = "40"+"°";
            newT1.textContent = length;
                
            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV
            blockNum++;
                
            //-----------------------LeftHand_down1---------------------------//
            var newElems = document.createElement("div");
            var st = $(".LHInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".lefthand_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+15+255;
            newElems.style.left = p + "px";         // 位置

            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3).toFixed(2) + "s"
            newT0.textContent = "-40"+"°";
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV
            blockNum++;
            
            //--------------------body+0-------------------
            var newElems = document.createElement("div");
            var st = $(".BodyInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".body_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_body");
                BodyNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_body");
                BodyNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_body");
                BodyNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+10;
            newElems.style.left = p + "px";

            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3+3/2).toFixed(2) + "s"
            newT0.textContent = "45"+"°";
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="200px";//延长时间2.5倍
                
            //--------------------body-0-------------------
            var newElems = document.createElement("div");
            var st = $(".BodyInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".body_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_body");
                BodyNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_body");
                BodyNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_body");
                BodyNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+10+205;
            newElems.style.left = p + "px";

            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3+3/2).toFixed(2) + "s"
            newT0.textContent = "-45"+"°";
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="200px";//延长时间2.5倍
                
            }
        );
            
    
});


/*-------------------------------------example1_chatting-------------------------------------------*/
$(document).ready(function () {
        $(".Chat_plus").click(
            function() {
                
                //---------------------------MOUTH_close0----------------------------------
                              
                var newElems = document.createElement("div");
                var st = $(".MouthInput").val();
                newElems.id = "block_" + blockNum;          //设置ID
                newElems.classList.add("block");
                var txt = $(".CurrentTime");

                $(".mouth_tl_" + ABC_st).prepend(newElems);
                if(ABC_st=="a"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_a++;
                }else if(ABC_st=="b"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_b++;
                }else{
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_c++;
                }
                newElems.style.position = "absolute";
                var p = txt.val() * 60-10;
                newElems.style.left = p + "px";
            

            //加上动作时长部分
            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3 - 1/2).toFixed(2) + "s"//减0.5s变为0.5s

            newT0.textContent = "CLOSE";
            //newT0.textContent = "OPEN";
           
            newT1.textContent = length;

            //加上控制部分

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="40px";
    

            //-----------------------MOUTH_open0---------------------------//
            var newElems = document.createElement("div");
                var st = $(".MouthInput").val();
                newElems.id = "block_" + blockNum;          //设置ID
                newElems.classList.add("block");
                var txt = $(".CurrentTime");

                $(".mouth_tl_" + ABC_st).prepend(newElems);
                if(ABC_st=="a"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_a++;
                }else if(ABC_st=="b"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_b++;
                }else{
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_c++;
                }
                newElems.style.position = "absolute";
                var p = txt.val() * 60-10+30;
                newElems.style.left = p + "px";
            
            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3 - 1/2).toFixed(2) + "s"//减0.5s变为0.5s

            //newT0.textContent = "CLOSE";
            newT0.textContent = "OPEN";
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
                document.getElementById("block_"+blockNumber).style.width="40px";
                
            //---------------------------MOUTH_close1----------------------------------
                              
                var newElems = document.createElement("div");
                var st = $(".MouthInput").val();
                newElems.id = "block_" + blockNum;          //设置ID
                newElems.classList.add("block");
                var txt = $(".CurrentTime");

                $(".mouth_tl_" + ABC_st).prepend(newElems);
                if(ABC_st=="a"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_a++;
                }else if(ABC_st=="b"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_b++;
                }else{
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_c++;
                }
                newElems.style.position = "absolute";
                var p = txt.val() * 60-10+60;
                newElems.style.left = p + "px";
            
            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3 - 1/2).toFixed(2) + "s"//减0.5s变为0.5s

            newT0.textContent = "CLOSE";
            //newT0.textContent = "OPEN";
           
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="40px";
                
            //-----------------------MOUTH_open1---------------------------//
            var newElems = document.createElement("div");
                var st = $(".MouthInput").val();
                newElems.id = "block_" + blockNum;          //设置ID
                newElems.classList.add("block");
                var txt = $(".CurrentTime");

                $(".mouth_tl_" + ABC_st).prepend(newElems);
                if(ABC_st=="a"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_a++;
                }else if(ABC_st=="b"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_b++;
                }else{
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_c++;
                }
                newElems.style.position = "absolute";
                var p = txt.val() * 60-10+90;
                newElems.style.left = p + "px";
            
            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3 - 1/2).toFixed(2) + "s"//减0.5s变为0.5s

            //newT0.textContent = "CLOSE";
            newT0.textContent = "OPEN";
           
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="40px";
                
             //---------------------------MOUTH_close2----------------------------------
                              
                var newElems = document.createElement("div");
                var st = $(".MouthInput").val();
                newElems.id = "block_" + blockNum;          //设置ID
                newElems.classList.add("block");
                var txt = $(".CurrentTime");

                $(".mouth_tl_" + ABC_st).prepend(newElems);
                if(ABC_st=="a"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_a++;
                }else if(ABC_st=="b"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_b++;
                }else{
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_c++;
                }
                newElems.style.position = "absolute";
                var p = txt.val() * 60-10+120;
                newElems.style.left = p + "px";
            
            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3 - 1/2).toFixed(2) + "s"//减0.5s变为0.5s

            newT0.textContent = "CLOSE";
            //newT0.textContent = "OPEN";
           
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="40px";
                
            //-----------------------MOUTH_open2---------------------------//
            var newElems = document.createElement("div");
                var st = $(".MouthInput").val();
                newElems.id = "block_" + blockNum;          //设置ID
                newElems.classList.add("block");
                var txt = $(".CurrentTime");

                $(".mouth_tl_" + ABC_st).prepend(newElems);
                if(ABC_st=="a"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_a++;
                }else if(ABC_st=="b"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_b++;
                }else{
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_c++;
                }
                newElems.style.position = "absolute";
                var p = txt.val() * 60-10+150;
                newElems.style.left = p + "px";
            
            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3 - 1/2).toFixed(2) + "s"//减0.5s变为0.5s

            //newT0.textContent = "CLOSE";
            newT0.textContent = "OPEN";
           
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="40px";
                
            //---------------------------MOUTH_close3----------------------------------
                              
                var newElems = document.createElement("div");
                var st = $(".MouthInput").val();
                newElems.id = "block_" + blockNum;          //设置ID
                newElems.classList.add("block");
                var txt = $(".CurrentTime");

                $(".mouth_tl_" + ABC_st).prepend(newElems);
                if(ABC_st=="a"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_a++;
                }else if(ABC_st=="b"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_b++;
                }else{
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_c++;
                }
                newElems.style.position = "absolute";
                var p = txt.val() * 60-10+180;
                newElems.style.left = p + "px";
            
            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3 - 1/2).toFixed(2) + "s"//减0.5s变为0.5s

            newT0.textContent = "CLOSE";
            //newT0.textContent = "OPEN";
           
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="40px";
          
            }
        );
        
});

            /*-----------example1_dancing-----------------*/
$(document).ready(function () {
        $(".Dance_plus").click(
            function() {
                
                //------------------------Head_down-------------------------------
            var newElems = document.createElement("div");  //新建div
                var st = $(".HeadInput").val();             //里面的文字
                newElems.classList.add("block");            //设置类
                newElems.id = "block_" + blockNum;          //设置ID
                var txt = $(".CurrentTime");                //获得位置

                if (txt.val() == "") {
                    alert("You Should Choose Time!")
                }
                else {
                    $(".head_tl_" + ABC_st).prepend(newElems);  //将div 放入
                    if (ABC_st == "a") {
                        newElems.classList.add("block_" + ABC_st + "_head");
                        HeadNum_a++;
                    } else if (ABC_st == "b") {
                        newElems.classList.add("block_" + ABC_st + "_head");
                        HeadNum_b++;
                    } else {
                        newElems.classList.add("block_" + ABC_st + "_head");
                        HeadNum_c++;
                    }
                    newElems.style.position = "absolute";
                    var p = txt.val() * 60 - 10+10;
                    newElems.style.left = p + "px";

                }

                var newT0 = document.createElement("div");
                var newT1 = document.createElement("div");
                var newT = document.createElement("div");
                newT0.classList.add("action");
                newT1.classList.add("time_length");
                newT.classList.add("block_content");
                $("#" + newElems.id).append(newT);
                $("#" + newElems.id).children("div").append(newT1);
                $("#" + newElems.id).children("div").prepend(newT0);//将子结构放入DIV
                var length = (newElems.offsetWidth / 60 - 1 / 3+1/2).toFixed(2) + "s"

                newT0.textContent = "DOWN";
                newT1.textContent = length;

                var newButtons0 = document.createElement("button");
                var newButtons1 = document.createElement("button"); //新建button
                newButtons0.classList.add("block_left");
                newButtons1.classList.add("block_right");
                $("#"+newElems.id).prepend(newButtons0);
                $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

                blockNum++;
                var blockNumber = blockNum-1;
                document.getElementById("block_"+blockNumber).style.width="120px";//时间1.5倍
                
                //------------------------Head_front-------------------------------
            var newElems = document.createElement("div");  //新建div
                var st = $(".HeadInput").val();             //里面的文字
                newElems.classList.add("block");            //设置类
                newElems.id = "block_" + blockNum;          //设置ID
                var txt = $(".CurrentTime");                //获得位置

                if (txt.val() == "") {
                    alert("You Should Choose Time!")
                }
                else {
                    $(".head_tl_" + ABC_st).prepend(newElems);  //将div 放入
                    if (ABC_st == "a") {
                        newElems.classList.add("block_" + ABC_st + "_head");
                        HeadNum_a++;
                    } else if (ABC_st == "b") {
                        newElems.classList.add("block_" + ABC_st + "_head");
                        HeadNum_b++;
                    } else {
                        newElems.classList.add("block_" + ABC_st + "_head");
                        HeadNum_c++;
                    }
                    newElems.style.position = "absolute";
                    var p = txt.val() * 60 - 10+10+135;
                    newElems.style.left = p + "px";

                }

                var newT0 = document.createElement("div");
                var newT1 = document.createElement("div");
                var newT = document.createElement("div");
                newT0.classList.add("action");
                newT1.classList.add("time_length");
                newT.classList.add("block_content");
                $("#" + newElems.id).append(newT);
                $("#" + newElems.id).children("div").append(newT1);
                $("#" + newElems.id).children("div").prepend(newT0);//将子结构放入DIV
                var length = (newElems.offsetWidth / 60 - 1 / 3+1/2).toFixed(2) + "s"

                newT0.textContent = "FRONT";
                newT1.textContent = length;

                var newButtons0 = document.createElement("button");
                var newButtons1 = document.createElement("button"); //新建button
                newButtons0.classList.add("block_left");
                newButtons1.classList.add("block_right");
                $("#"+newElems.id).prepend(newButtons0);
                $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

                blockNum++;
                var blockNumber = blockNum-1;
                document.getElementById("block_"+blockNumber).style.width="120px";//时间1.5倍

                //---------------------------MOUTH_close----------------------------------
                              
                var newElems = document.createElement("div");
                var st = $(".MouthInput").val();
                newElems.id = "block_" + blockNum;          //设置ID
                newElems.classList.add("block");
                var txt = $(".CurrentTime");

                $(".mouth_tl_" + ABC_st).prepend(newElems);
                if(ABC_st=="a"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_a++;
                }else if(ABC_st=="b"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_b++;
                }else{
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_c++;
                }
                newElems.style.position = "absolute";
                var p = txt.val() * 60-10+10+15;
                newElems.style.left = p + "px";
            
            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3 + 1/2).toFixed(2) + "s"//1.5s

            newT0.textContent = "CLOSE";
            //newT0.textContent = "OPEN";
           
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="120px";//时间1.5倍
                
            //-----------------------MOUTH_open1---------------------------//
            var newElems = document.createElement("div");
                var st = $(".MouthInput").val();
                newElems.id = "block_" + blockNum;          //设置ID
                newElems.classList.add("block");
                var txt = $(".CurrentTime");

                $(".mouth_tl_" + ABC_st).prepend(newElems);
                if(ABC_st=="a"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_a++;
                }else if(ABC_st=="b"){
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_b++;
                }else{
                    newElems.classList.add("block_" + ABC_st + "_mouth");
                    MouthNum_c++;
                }
                newElems.style.position = "absolute";
                var p = txt.val() * 60-10+10+15+135;
                newElems.style.left = p + "px";
            
            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3 + 1/2).toFixed(2) + "s"//1.5s

            //newT0.textContent = "CLOSE";
            newT0.textContent = "OPEN";
           
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="120px";//时间1.5倍
                
            //------------------------LeftHand_down-------------------------------
            var newElems = document.createElement("div");
            var st = $(".LHInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".lefthand_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+10+15+15;//延时15
            newElems.style.left = p + "px";         // 位置

            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3+1/2).toFixed(2) + "s"
            newT0.textContent = "-20"+"°";
            newT1.textContent = length;
                
            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="120px";//时间1.5倍

            //-----------------------LeftHand_0---------------------------//
            var newElems = document.createElement("div");
            var st = $(".LHInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".lefthand_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_lh");
                LHNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+10+15+15+135;//延时10
            newElems.style.left = p + "px";         // 位置

            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3+1/2).toFixed(2) + "s"
            newT0.textContent = "0"+"°";
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV
            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="120px";//1.5倍
            
            //------------------------RightHand_down-------------------------------
            var newElems = document.createElement("div");
            var st = $(".RHInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".righthand_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_rh");
                RHNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_rh");
                RHNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_rh");
                RHNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+10+15+15+15;
            newElems.style.left = p + "px";
           
            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3+1/2).toFixed(2) + "s"
            newT0.textContent = "-20"+"°";
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="120px";//时间1.5倍
                
            //------------------------RightHand_0-------------------------------
            var newElems = document.createElement("div");
            var st = $(".RHInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".righthand_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_rh");
                RHNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_rh");
                RHNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_rh");
                RHNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+10+15+15+15+135;
            newElems.style.left = p + "px";
           
            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3+1/2).toFixed(2) + "s"
            newT0.textContent = "0"+"°";
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="120px";//时间1.5倍
                
            //------------------------Body-20-------------------------------
            var newElems = document.createElement("div");
            var st = $(".BodyInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".body_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_body");
                BodyNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_body");
                BodyNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_body");
                BodyNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+10+15+15+15+15;
            newElems.style.left = p + "px";

            //加上动作时长部分
            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3+1/2).toFixed(2) + "s"
            newT0.textContent = "-30"+"°";
            newT1.textContent = length;

            //加上控制部分

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="120px";//时间1.5倍
            
            //------------------------Body0-------------------------------
            var newElems = document.createElement("div");
            var st = $(".BodyInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".body_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_body");
                BodyNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_body");
                BodyNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_body");
                BodyNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+10+15+15+15+15+135;
            newElems.style.left = p + "px";

            //加上动作时长部分
            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3+1/2).toFixed(2) + "s"
            newT0.textContent = "0"+"°";
            newT1.textContent = length;

            //加上控制部分

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="120px";//时间1.5倍
            
            //------------------------Panel-40-------------------------------
            var newElems = document.createElement("div");
            var st = $(".PInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".panel_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_p");
                PNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_p");
                PNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_p");
                PNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+10+15+15+15+15+15;
            newElems.style.left = p + "px";

            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3+1/2).toFixed(2) + "s"
            newT0.textContent = "-40"+"°";
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="120px";//时间1.5倍
            
            //------------------------Panel0-------------------------------
            var newElems = document.createElement("div");
            var st = $(".PInput").val();
            newElems.classList.add("block");
            newElems.id = "block_" + blockNum;          //设置ID
            var txt = $(".CurrentTime");

            $(".panel_tl_" + ABC_st).prepend(newElems);
            if(ABC_st=="a"){
                newElems.classList.add("block_" + ABC_st + "_p");
                PNum_a++;
            }else if(ABC_st=="b"){
                newElems.classList.add("block_" + ABC_st + "_p");
                PNum_b++;
            }else{
                newElems.classList.add("block_" + ABC_st + "_p");
                PNum_c++;
            }
            newElems.style.position = "absolute";
            var p = txt.val() * 60-10+10+15+15+15+15+15+135;
            newElems.style.left = p + "px";

            var newT0 = document.createElement("div");
            var newT1= document.createElement("div");
            var newT = document.createElement("div");
            newT0.classList.add("action");
            newT1.classList.add("time_length");
            newT.classList.add("block_content");
            $("#"+newElems.id).append(newT);
            $("#"+newElems.id).children("div").append(newT1);
            $("#"+newElems.id).children("div").prepend(newT0);//将子结构放入DIV
            var length = (newElems.offsetWidth/60-1/3+1/2).toFixed(2) + "s"
            newT0.textContent = "0"+"°";
            newT1.textContent = length;

            var newButtons0 = document.createElement("button");
            var newButtons1 = document.createElement("button"); //新建button
            newButtons0.classList.add("block_left");
            newButtons1.classList.add("block_right");
            $("#"+newElems.id).prepend(newButtons0);
            $("#"+newElems.id).append(newButtons1);    //将子结构放入DIV

            blockNum++;
            var blockNumber = blockNum-1;
            document.getElementById("block_"+blockNumber).style.width="120px";//时间1.5倍
                
                
            }
        );
            
    
});

