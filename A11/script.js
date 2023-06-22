var request = new XMLHttpRequest();


request.open('GET', 'https://api.giphy.com/v1/gifs/random?api_key=9jqws5ufNKlAtEn1LL2K4tkrEl9USikg&tag=smile');

request.onload = function () {
    var response = request.response;
    var parseData = JSON.parse(response);
    // console.log(parseData);
    var originalURL = parseData.data.images.original.url;
    // console.log(originalURL);
    document.getElementById("main").setAttribute("src",originalURL);
} 

function reload(){
    window.location.reload();
}

document.getElementById("button").addEventListener("click",reload);

request.send()


