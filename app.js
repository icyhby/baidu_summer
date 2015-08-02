/**
 * Created by icy on 2015/8/1.
 */
window.onload= function() {
    var stage = new createjs.Stage("canvas");
    var cat = new Cat();
    var count=0;
    var time = 60;
    stage.addChild(cat);
    moveCat(cat);
    var timeControlor = new newText("时间:"+time,20,20);
    var scrop = new newText("得分:"+count,300,20);
    stage.addChild(timeControlor);
    stage.addChild(scrop);
    addYuanBao();
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick",tick);
    function tick(event) {
        changeText("时间:"+(60-Math.floor(createjs.Ticker.getTime()/1000)),timeControlor);
        changeText("得分:"+count,scrop);
        if(60-Math.floor(createjs.Ticker.getTime()/1000)==55){
            createjs.Ticker.setPaused();
            createjs.Ticker.removeAllEventListeners("tick");
        }
        var num = stage.getNumChildren();
       // console.log("get@@@"+count);
        for(var i=3;i<num;i++){
          if(Math.abs( stage.getChildAt(i).x - stage.getChildAt(0).x )<70 &&Math.abs( stage.getChildAt(i).y - stage.getChildAt(0).y )<70 ){
              count++;
              stage.removeChildAt(i);
              num--;
          }
        }
        num = stage.getNumChildren();
        for(var i=3;i<num;i++){
            if(stage.getChildAt(i).y >580){
                stage.removeChildAt(i);
                num=num-1;
            }
        }
        num = stage.getNumChildren();
        var flag = stage.getChildAt(num-1).y;
        if(flag>70&&flag<100){
            addYuanBao();
        }
        stage.update();
    }



    function Cat() {
        var cat = new createjs.Shape();
        cat.graphics.beginFill("yellow").drawCircle(0, 0, 50);
        cat.x=200;
        cat.y=550;
        cat.graphics.endFill();
        return cat;
    }

    function YuanBao(x,y) {
        var yuanBao = new createjs.Shape();
        yuanBao.graphics.beginFill("red").drawCircle(0, 0, 20);
        yuanBao.x= x;
        yuanBao.y = y;
        yuanBao.graphics.endFill();
        return yuanBao;
    }

    function addYuanBao() {
            var x = Math.random() * 400;
            if (x >= 380) {
                x = x - 20;
            }
            if (x <= 20) {
            x = x + 20;
             }
            var yuanBao = new YuanBao(x,0);
            stage.addChild(yuanBao);
            createjs.Tween.get(yuanBao,{loop:true}).to({y:600}, 3000);
            yuanBao = null;

    }
    function moveCat(cat){
        stage.addEventListener("stagemousemove",function(e){
            var newX = e.stageX;
            if(newX <=50){
                newX = newX +50;
            }
            if(newX>=350){
                newX = newX -50;
            }
            cat.x = newX;
        })
    }
    function distoryObject(yuanBao){
        yuanBao=null;
    }

    function newText(text,x,y){
        var textObject = new createjs.Text(text, "20px Arial", "black");
        textObject.x = x;
        textObject.y = y;
        return textObject;
    }
    function changeText(text,object){
        object.text = text;
    }

    function timeControl(timeControlor){
        time = (time--);
        console.log("time----------"+time);
        timeControlor.text = "时间："+time;
    }



}
