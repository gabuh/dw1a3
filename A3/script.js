
const projectFocusPosition = {
    _var: scrollProjectListPosition=0,
    get var() {
        return this._var;
    },
    set var(value) {
        this._var = value;
    }
}


document.getElementById("modalInterface-left").addEventListener("click",function(){
    var list=document.getElementById("projectList");
    var itemWidth = list.getElementsByTagName("div")[0].clientWidth;
    var pos = projectFocusPosition._var - itemWidth - 10;
    if(pos >= 0){
        list.scrollTo(pos,0);
        projectFocusPosition._var = pos;
    }
    
});
document.getElementById("modalInterface-right").addEventListener("click",function(){
    var list=document.getElementById("projectList");
    var itemWidth = list.getElementsByTagName("div")[0].clientWidth;
    var pos = projectFocusPosition._var + itemWidth + 10;
    console.log("------------\nposition: "+pos);
    console.log("Focus: "+projectFocusPosition._var);
    console.log("Scroll Size: "+list.scrollWidth);
    if( pos <= list.scrollWidth){
        list.scrollTo(pos,0);
        projectFocusPosition._var = pos;
    }
    console.log("Focusa tualizado: "+projectFocusPosition._var);
});
