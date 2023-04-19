function goPage(x){
  x>0?x="A"+x:x="HW";
   window.location.href = x ;
} 



var id = null;
function logoAnimation() {
  const el = document.getElementById("logo-animated");
  var pos = 1;
  clearInterval(id);
  id = setInterval(frame_logo, 380);
  function frame_logo(){
    if(pos == 14){
      clearInterval(id);
    }else{
      el.src = `./assets/animation/${pos}.svg`;
      pos++;
    }
  }
}

function init(){
  const element = document.getElementsByClassName("btn");
  const contents = document.getElementsByClassName("textContent");
  for(let i=0; i<element.length ;i++ ){
    element.item(i).addEventListener("click", function() {
     for (let index = 0; index < contents.length; index++) {
         contents.item(index).classList.remove("active");
         element.item(index).classList.remove("active");
     }
      element.item(i).classList.add("active");
      contents.item(i).classList.add("active");
      document.getElementById("footer").style.position="relative";

      document.getElementById('footer').addEventListener("click", function(){
        element.item(i).classList.remove("active");
        contents.item(i).classList.remove("active");
        document.getElementById("footer").style.position="absolute";
      });

      document.getElementById('escopo').addEventListener("click", function(){
        element.item(i).classList.remove("active");
        contents.item(i).classList.remove("active");
        document.getElementById("footer").style.position="absolute";
      });

      document.getElementsByTagName('header')[0].addEventListener("click", function(){
        element.item(i).classList.remove("active");
        contents.item(i).classList.remove("active");
        document.getElementById("footer").style.position="absolute";
      });



    }); 

    // contents.item(i).addEventListener("mouseout", function(){
      // element.item(i).classList.remove("active");
      // contents.item(i).classList.remove("active");
    //   document.getElementById("footer").style.position="absolute";
    // });
  } 


  
  document.getElementById("logo-animated").addEventListener("mouseover",logoAnimation);
  logoAnimation();
}

document.addEventListener('DOMContentLoaded', init, false);