var dx;
var dy;
var px;
var py;
var epx;
var epy;
var edx;
var edy;
var obj;
var enemy;
var objFood;
var objFood_y;
var objFood_x;
var tmp;
var jump;
var field = window.innerHeight + window.innerWidth ;
var field_x;
var field_y;
var playerSize=20;
var playerSizeLength=playerSize.toString().length;

function screenEyes(){
    var x = Number.parseInt(window.innerWidth.toString().substring(window.innerWidth.toString().length-playerSizeLength));
    var y = Number.parseInt(window.innerHeight.toString().substring(window.innerHeight.toString().length-playerSizeLength));
    if(x > playerSize){
        field_x = window.innerWidth - x;
    }else{
        field_x = window.innerWidth - x -playerSize;
    }
    if(y > playerSize){
        field_y = window.innerHeight - y;
    }else{
        field_y = window.innerHeight - y -playerSize;
    }
}
//Será usado o evento keydown que mostra quando a tecla é pressionada e;
//keyUp quando a tecla é liberada.

// É está função que vai inicializar as variáveis globais.
function start(){
    screenEyes();
    dx = 0;
    dy = 0;
    px = 0;
    py = 0;
    edx = 0;
    edy = 0;
    epy=0;
    epx=0;

    objFood_x = field_x;
    objFood_y = field_y;
    obj = document.getElementById("main");
    enemy = document.getElementById("enemy");
    objFood = document.getElementById("food");
    document.addEventListener("keydown", keyDw);
    document.addEventListener("keyup", keyUp);
    tmp = setInterval(etenterframe, 20);
    jump = playerSize;
    objFood.style.top = objFood_y + "px";
    objFood.style.left = objFood_x + "px";
}

//Está função é que fará com que o objeto se movimente

function keyDw(e){
    var key = e.keyCode;
    if(key==37 ){
        dx=-1;
    }else if(key==65){
        edx=-1;
    } else if(key==38 ){
        dy=-1;
    }else if(key==87){
        edy=-1
    }else if(key==39 ){
        dx=1;
    }else if(key==68){
        edx=1;
    }else if(key==40 ){
        dy=1;
    }else if(key==83){
        edy=1;
    }
}

// if(key==37 || key == 65){
//     dx=-1;
// } else if(key==38 || key == 87){
//     dy=-1;
// }else if(key==39 || key == 68){
//     dx=1;
// }else if(key==40 || key == 83){
//     dy=1;
// }


//a key up irá com com que o objeto parent, já que a distância que ele irá se movimentar é zero.

function keyUp(e){
    var key = e.keyCode;
    if(key==37 ){
        dx=0;
    }else if(key==65){
        edx=0;
    }else if(key==38 ){
        dy=0;
    }else if(key==87){
        edy=0;
    }else if(key==39 ){
        dx=0;
    }else if(key==68){
        edx=0;
    }else if(key==40 ){
        dy=0;
    }else if(key==83){
        edy=0;
    }
}

// if(key==37 || key == 65){
//     dx=0;
// }else if(key==38 || key == 87){
//     dy=0;
// }else if(key==39 || key == 68){
//     dx=0;
// }else if(key==40 || key == 83){
//     dy=0;
// }


//Função que irá ser o coração do movimento e irá atualizar o movimento.

function etenterframe(){
    px+=dx*jump;
    py+=dy*jump;
    epx+=edx*jump;
    epy+=edy*jump;
    if(objFood_x  == px && objFood_y == py){
        // console.log(obj.style.left+ "<- X - Y -> " + obj.style.top);
        placeFood();
    }
    if(objFood_x  == epx && objFood_y == epy){
        // console.log(obj.style.left+ "<- X - Y -> " + obj.style.top);
        placeFood();
    }
    // console.log("x"+ px,",  y="+ py)

    if(py > field_y){
        py=field_y;
    }
    if(epy > field_y){
        epy=field_y;
    }
    if(px > field_x){
        px=field_x;
    }
    if(epx > field_x){
        epx = field_x;
    }
    if(py < 0){
        py=0;
    }
    if(epy < 0){
        epy=0;
    }
    if(px < 0){
        px=0;
    }    
    if(epx < 0){
        epx=0;
    }
    
    
    //--------------
    enemy.style.left=epx+"px";
    enemy.style.top=epy+"px";
    obj.style.left=px+"px";    
    obj.style.top=py+"px";
    
    if(window.innerWidth+window.innerHeight != field){
        screenEyes();
    }
}

function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    objFood_x = Math.floor(Math.random() * field_x/playerSize)*playerSize;
    objFood_y = Math.floor(Math.random() * field_y/playerSize)*playerSize;
    // console.log(objFood_x + "<- x - y -> "+ objFood_y)
    objFood.style.left =  objFood_x +"px";
    objFood.style.top =  objFood_y + "px";
}



window.addEventListener("load", start);
