const request = new XMLHttpRequest();
const searchField = document.getElementById("searchInput");
const magnifyGlass = document.querySelector("header form div button");

function queryInput(){
  const api = "https://api.napster.com/v2.2/search/verbose?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm&query=" + searchField.value + "&type=artist";
  runQuery(api);
}

document.querySelector("header form").addEventListener('submit', function(e){
  e.preventDefault();

  if(searchField.value <= 0){
    document.querySelector("header form p").style.opacity = "1";
    document.querySelector("header form p").innerHTML = "You must type a search keyword";
  }

  else if(searchField.value > 0 || searchField.value != 0){
    queryInput();
    document.querySelector("header form p").style.opacity = "0";
  }
});

magnifyGlass.addEventListener("click", function(){
  if(searchField.value <= 0){
    document.querySelector("header form p").style.opacity = "1";
    document.querySelector("header form p").innerHTML = "You must type a search keyword";
  }

  else if(searchField.value > 0 || searchField.value != 0){
    headerTwo.style.opacity = "1";
    queryInput();
    document.querySelector("header form p").style.opacity = "0";
  }
});

function runQuery(url){
  request.open("GET", url, true);

  request.onload = function(){
    if(request.status >= 200 && request.status < 400){
      const jsonObj = JSON.parse(request.responseText);

      let queryInfo = "";

      for(let i = 0; i < jsonObj.search.data.artists.length; i++){
          queryInfo += "<article>";
          queryInfo += "<img src='" + jsonObj.search.data.artists[i].links.images.href + "' title='" + jsonObj.search.data.artists[i].name + " by " + jsonObj.search.data.artists[i] + " " + "' alt='" + jsonObj.search.data.artists[i].name + " by " + jsonObj.search.data.artists[i] + "'>";
          queryInfo += "<p><span>" + jsonObj.search.data.artists[i].name + "</span></p>";
          queryInfo += "<p>" + jsonObj.search.data.artists[i] + "</p>";
          queryInfo += "</article>";
      }

      const contentLocationInfo = document.querySelector("section");
      contentLocationInfo.innerHTML = queryInfo;

      console.log(jsonObj);
    }
  };

  request.onerror = function(){
    console.log("connection error");
  };

  request.send();
}
