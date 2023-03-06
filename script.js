function goPage(x){
  x>0?x="A"+x:x="HW";
   window.location.href = "https://gabuh.github.io/dw1a3/"+ x ;
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
    element.item(i).addEventListener("mouseover", function() {
      this.style.zoom="2";
      this.style.background="#9d0eb8";
      this.style.color="#F8F9FA";
      contents.item(i).style.display="block";
      document.getElementById("footer").style.position="relative";

    }); 
    
    element.item(i).addEventListener("mouseout", function(){
      this.style.zoom="0";
      this.style.background="#d9fe05";
      this.style.color="#000000";
      contents.item(i).style.display="none";
      document.getElementById("footer").style.position="absolute";
    });
  } 

  
  document.getElementById("logo-animated").addEventListener("mouseover",logoAnimation);
  logoAnimation();
}

document.addEventListener('DOMContentLoaded', init, false);