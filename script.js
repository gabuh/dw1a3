function goPage(x){
  window.location.href = "https://gabuh.github.io/dw1a3/A"+ x ;
}

function init(){
  const element = document.getElementsByClassName("btn");
  const contents = document.getElementsByClassName("textContent");
  for(let i=0; i<element.length ;i++ ){
    element.item(i).addEventListener("mouseover", function() {
      this.style.zoom="2";
      this.style.background="#F8F9FA";
      this.style.color="#212529";
      contents.item(i).style.display="block";
    }); 
    
    element.item(i).addEventListener("mouseout", function(){
      this.style.zoom="0";
      this.style.background="#343A40";
      this.style.color="#F8F9FA";
      contents.item(i).style.display="none";
    });
  } 
 
}

document.addEventListener('DOMContentLoaded', init, false);