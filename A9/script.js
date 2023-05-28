var boolLeftPanelButton = false;

BackGround = {
  data: new Array(),
  add(gradient){
    console.log(gradient);
    BackGround.data.push(gradient)
  },
  update(index, gradient){
    BackGround.data[index] = gradient
    BackGround.set()
  },
  set(){
    let linear = ''
    for (let index=0; index < BackGround.data.length; index++){
      element = BackGround.data[index]
      console.log(index, BackGround.data.length -1);
      if(index == BackGround.data.length -1){
        linear = linear + element
      }else{
        linear = linear + (element + ', ')     
      }
    }
    console.log(linear)
    document.body.style.background = linear
  }
}

class ColorControls {
    constructor(element, index) {
      this.index = index;
      this.pos1 = 0;
      this.pos2 = 0;
      this.pos3 = 0;
      this.pos4 = 0;
      this.deg = 0;
      this.bodyElement = document.body;
      this.controlElements = element.querySelectorAll('.control');
      this.addEventListeners();
    }
  
    addEventListeners() {
      this.controlElements.forEach((control, index) => {
        control.addEventListener('input', () => {
          this.updateBackground(index, control.value);
        });
      });
    }


    updateBackground(index, value) {
      switch (index) {
        case 0:
          this.pos1 = value;
          break;
        case 1:
          this.pos2 = value;
          break;
        case 2:
          this.pos3 = value;
          break;
        case 3:
          this.pos4 = value;
          break;
      }
      const gradient = `linear-gradient(${this.deg}deg, black ${this.pos1}%, white ${this.pos2}%, green ${this.pos3}%, pink ${this.pos4}%)`;
      BackGround.update(this.index,gradient);
    }
}
  

const Storage ={
    get(){
      return JSON.parse(localStorage.getItem("gabuh.a9:layers")) || []
    },
    set(layer){
      localStorage.setItem("gabuh.a9:layers",JSON.stringify(layer))
    }
  }

Controls = {
    controls : document.getElementsByClassName('controls pos'),
    items : document.getElementsByClassName('controlsReference'),
    controlsContainer: document.querySelector('.controls.container'),
    set(){
        for(let i=0; i<Controls.controls.length; i++){
                Controls.items[i].addEventListener('click', () => {
                    Controls.controls[i].classList.add('active');
                    document.querySelector('.leftPanelButton').classList.remove('active');
                    document.querySelector('.leftPanel').classList.remove('active');
                    boolLeftPanelButton = false;
                });
            //controle de cores
                var elements = Controls.controls[i].getElementsByClassName('color picker');
                for(var j=0; j< elements.length; j++){
                    elements[j].addEventListener('input',event => {
                            console.log(event.target.value);
                    });
                }
            }
    },
    add(index){
        div = document.createElement('div')
        div.classList.add('controls')
        div.classList.add('pos')
        html = `<div>
                    <input type="color"  class="color picker">
                </div>
                <div>
                    <input type="color"  class="color picker">
                </div>
                <div>
                    <input type="color"  class="color picker">
                </div>
                <div>
                    <input type="color"  class="color picker">
                </div>
                <input type="range" value="0" class="control">
                <input type="range" value="0" class="control">
                <input type="range" value="0" class="control">
                <input type="range" value="0" class="control">`
                console.log(index);
        div.innerHTML = html
        BackGround.add(`linear-gradient(0deg, black 50%, white 50%, green 50%, pink 50%)`);
        new ColorControls(div,index)
        Controls.controlsContainer.appendChild(div)
    },
    clear(){
        Controls.controlsContainer.innerHTML = ""
    }
}

Layer = {
    all : Storage.get(),
    add(layer){
        this.all.push(layer);
        App.reload();
      },
      remove(index){
        this.all.splice(index,1);
        App.reload();
      },
      create(){
      }
}


LeftPanelManager = {
    topLevel : 50,
    leftPanelContainer : document.querySelector('.leftPanel'),
    insert(layer,index){
        if(layer.nodeName != "DIV"){
            layer = LeftPanelManager.getDiv();
        }
        layer.innerHTML = `layer ${index}`;
        layer.dataset.index = index;
        // layer.addEventListener('click', event => {
            // console.log(Controls.controls);
        // });
        // console.log(layer, index);
        LeftPanelManager.topLevel = LeftPanelManager.topLevel-2;
        LeftPanelManager.leftPanelContainer.style.top = LeftPanelManager.topLevel+"%";
        LeftPanelManager.leftPanelContainer.style.height = (100-LeftPanelManager.topLevel)+"%";    
        LeftPanelManager.leftPanelContainer.appendChild(layer);
        Controls.add(index);
    },
    clear(){
        LeftPanelManager.leftPanelContainer.innerHTML = '<div id="insertButton">+</div>';
        document.getElementById('insertButton').addEventListener('click', () => {
            const div = document.createElement('div');
            div.classList.add('controlsReference');
            Controls.add();
            Layer.add(div);
        });
    },
    getDiv(){
        const div = document.createElement('div');
        div.classList.add('controlsReference');
        return div;
    }

};

document.getElementById('insertButton').addEventListener('click', () => {
    const div = document.createElement('div');
    div.classList.add('controlsReference');
    Controls.add();
    Layer.add(div);
});



document.querySelector('.leftPanelButton').addEventListener("click", event => {
    if(boolLeftPanelButton){
        event.target.classList.remove('active');
        document.querySelector('.leftPanel').classList.remove('active');
        boolLeftPanelButton = false;
    }else{
        document.querySelector('.leftPanel').classList.add('active');
        event.target.classList.add('active');
        var element = document.querySelector('.controls.pos.active')
        if(element!=null){
            element.classList.remove('active')
        }
        boolLeftPanelButton = true
    }
})



 const App = {
    init(){
      Layer.all.forEach(LeftPanelManager.insert);
      Storage.set(Layer.all);
      Controls.set();
    },
    reload(){
      LeftPanelManager.clear();
      Controls.clear();
      App.init();
    },
  };
  
  
  App.init();


// const bodyElement = document.querySelector('body');

// var pos1 = 0;
// var pos2 = 0;
// var pos3 = 0;
// var pos4 = 0;
// var deg = 0;

// bodyElement.classList.add


// // document.querySelector('.control.angulo:nth-child(1)').addEventListener('input', function(){
// //     bodyElement.style.background = `linear-gradient(${this.value*3.6}deg, black ${pos1}%, white ${pos2}%, green ${pos3}%, pink ${pos4}%)`;
// //     deg = this.value*3.6;
// // });

// document.querySelectorAll('.control')[0].addEventListener('input', function(){
//     bodyElement.style.background = `linear-gradient(${deg}deg, black ${this.value}%, white ${pos2}%, green ${pos3}%, pink ${pos4}%)`;
//     pos1 = this.value;
// });
// document.querySelectorAll('.control')[1].addEventListener('input', function(){
//     bodyElement.style.background = `linear-gradient(${deg}deg, black ${pos1}%, white ${this.value}%, green ${pos3}%, pink ${pos4}%)`;
//     pos2 = this.value;
// });
// document.querySelectorAll('.control')[2].addEventListener('input', function(){
//     bodyElement.style.background = `linear-gradient(${deg}deg, black ${pos1}%, white ${pos2}%, green ${this.value}%, pink ${pos4}%)`;
//     pos3 = this.value;
// });
// document.querySelectorAll('.control')[3].addEventListener('input', function(){
//     bodyElement.style.background = `linear-gradient(${deg}deg, black ${pos1}%, white ${pos2}%, green ${pos3}%, pink ${this.value}%)`;
//     pos4 = this.value;
// });

// document.getElementById('screenWatch').addEventListener('click',() => {
//     var element = document.querySelector('.controls.pos.active')
//     if(element!=null){
//         element.classList.remove('active')
//     }
// })