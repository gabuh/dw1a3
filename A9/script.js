const bodyElement = document.querySelector('body');

var pos1 = 0;
var pos2 = 0;
var pos3 = 0;
var pos4 = 0;
var deg = 0;


// document.querySelector('.control.angulo:nth-child(1)').addEventListener('input', function(){
//     bodyElement.style.background = `linear-gradient(${this.value*3.6}deg, black ${pos1}%, white ${pos2}%, green ${pos3}%, pink ${pos4}%)`
//     deg = this.value*3.6;
// });
document.querySelector('.control:nth-child(1)').addEventListener('input', function(){
    bodyElement.style.background = `linear-gradient(${deg}deg, black ${this.value}%, white ${pos2}%, green ${pos3}%, pink ${pos4}%)`
    pos1 = this.value;
});
document.querySelector('.control:nth-child(2)').addEventListener('input', function(){
    bodyElement.style.background = `linear-gradient(${deg}deg, black ${pos1}%, white ${this.value}%, green ${pos3}%, pink ${pos4}%)`
    pos2 = this.value;
});
document.querySelector('.control:nth-child(3)').addEventListener('input', function(){
    bodyElement.style.background = `linear-gradient(${deg}deg, black ${pos1}%, white ${pos2}%, green ${this.value}%, pink ${pos4}%)`
    pos3 = this.value
});
document.querySelector('.control:nth-child(4)').addEventListener('input', function(){
    bodyElement.style.background = `linear-gradient(${deg}deg, black ${pos1}%, white ${pos2}%, green ${pos3}%, pink ${this.value}%)`
    pos4 = this.value;
});