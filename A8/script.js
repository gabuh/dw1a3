
DOM = {
 gridGameContainer: document.querySelector('#grid .content-panel'),
 flexGameContainer: document.querySelector('#flex .content-panel'),

 addContent(number, path,container){
    const div = document.createElement('div');
    const html = `<div> <span>LV${number}</span><img src="./frames/${path}/${number}/${number}.gif" alt="lv${number}"></div>` 
    div.innerHTML =  html;
    container.appendChild(div);
 }

}

for (let index = 4; index <= 30; index++) {
    DOM.addContent(index, "grid",DOM.gridGameContainer);
}

for (let index = 1; index <= 24; index++) {
    DOM.addContent(index, "flex",DOM.flexGameContainer);
}



const focusPosition1 = {
    _var: scroolPosition=0,
    get var() {
        return this._var;
    },
    set var(value) {
        this._var = value;
    },
}
const focusPosition2 = {
    _var: scroolPosition=0,
    get var() {
        return this._var;
    },
    set var(value) {
        this._var = value;
    },
}

const gridSection = document.getElementById("grid");
const flexSection = document.getElementById("flex");
gridSection.querySelector('.panel-direction-left').addEventListener("click",function(){
    var list=gridSection.querySelector('.carousel-list.container.content-panel');
    var itemWidth = list.getElementsByTagName("div")[0].clientWidth;
    var pos = focusPosition1._var - itemWidth - 20;
    if(pos >= 0){
        list.scrollTo(pos,0);
        focusPosition1._var = pos;
    }
   
});
gridSection.querySelector(".panel-direction-right").addEventListener("click",function(){
    var list=gridSection.querySelector('.carousel-list.container.content-panel');
    var itemWidth = list.getElementsByTagName("div")[0].clientWidth;
    var pos = focusPosition1._var + itemWidth + 20;
    if( pos <= list.scrollWidth){
            list.scrollTo(pos,0);
            focusPosition1._var = pos;
        }   
});

flexSection.querySelector('.panel-direction-left').addEventListener("click",function(){
    var list=flexSection.querySelector('.carousel-list.container.content-panel');
    var itemWidth = list.getElementsByTagName("div")[0].clientWidth;
    var pos = focusPosition2._var - itemWidth - 20;
    if(pos >= 0){
        list.scrollTo(pos,0);
        focusPosition2._var = pos;
    }
   
});
flexSection.querySelector(".panel-direction-right").addEventListener("click",function(){
    var list=flexSection.querySelector('.carousel-list.container.content-panel');
    var itemWidth = list.getElementsByTagName("div")[0].clientWidth;
    var pos = focusPosition2._var + itemWidth + 20;
    if( pos <= list.scrollWidth){
            list.scrollTo(pos,0);
            focusPosition2._var = pos;
        }   
});
