function goPage(x){
  window.location.href = "https://gabuh.github.io/dw1a3/A"+ x ;
}

function zoomHere(el,y,x){
  const items = document.getElementsByClassName("textContent");
  if (y == true) {
    el.style.zoom=0;
    items[x].style.display="none";
  }else{
    el.style.zoom=2;
    items[x].style.display="block";
  }
}
