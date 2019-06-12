// assign DOM elements to a variable
const btnSearch = document.getElementById("btnSearch");
const txtSearch = document.getElementById("food");
const resultArea = document.getElementById("result");
let out = "";

btnNewSearch.onclick = function() {
  document.location.reload(true);
};
btnSearch.onclick = function() {
  var searchTerm = txtSearch.value;
  const url = `https://api.punkapi.com/v2/beers?food=${searchTerm}`;
  console.log(url);
  fetch(url)
    .then(function(data) {
      return data.json();
    })

    .then(function(jsonObject) {
      console.log(jsonObject.length);

      if (jsonObject.length === 0) {
        const beerInfo = new Array(
          "Sorry we could not find a match.",
          "Please try a new Search.",
          "",
          ""
        );
        beerOut(beerInfo);
      } else {
        for (beer in jsonObject) {
          const beerInfo = new Array(
            jsonObject[beer].name,
            jsonObject[beer].tagline,
            jsonObject[beer].description,
            jsonObject[beer].image_url
          );
          if (beerInfo[3] === null) {
            beerInfo[3] = "./imageNotAvail.png";
            beerOut(beerInfo);
          } else {
            beerOut(beerInfo);
          }
        }
      }
      resultArea.innerHTML = out;
    })
    .catch(function(e) {
      console.log("Error: " + e);
    });
};
function beerOut(beer) {
  console.log(beer);

  out += `<div class="beer">
 <div class="beerImage"><img src="${beer[3]}"></div>
 <div class="beerText">
 <h2>${beer[0]}</h2>
 <h3>${beer[1]}</h3>
 <p><em>${beer[2]}</em></p>
 </div>
 </div>`;
}
