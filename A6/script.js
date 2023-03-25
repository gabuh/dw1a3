const darkButton = document.getElementById("dark");
const lightButton = document.getElementById("light");
const greenButton = document.getElementById("green");
const body = document.body;

const theme = localStorage.getItem('theme');
if(theme){
    body.classList.add(theme);
}


const Nav = {
    open(item){
        item.classList.add("active")
    },
    close(item){
        item.classList.remove("active")
    }
  };

  
  const element = document.getElementsByClassName("nav-item has-dropdown");
  const drop = document.getElementsByClassName("dropdown");
  for(let i=0; i<element.length ;i++ ){
    element.item(i).addEventListener("mouseover", function() {
        Nav.open(drop.item(i));
    }); 
    
    drop.item(i).addEventListener("mouseout", function(){
        Nav.close(drop.item(i));
    });

    
} 
// ----------


//--------
darkButton.onclick = () =>{
    body.setAttribute('class','dark');
    localStorage.setItem('theme','dark');
};
lightButton.onclick = () =>{
    body.setAttribute('class','light');
    localStorage.setItem('theme','light');
};
greenButton.onclick = () =>{
    body.setAttribute('class','green');
    localStorage.setItem('theme','green');
};



    // darkButton.addEventListener("click", function(){
        
    // });
    // darkButton.addEventListener("click", function(){
        
    // });

  