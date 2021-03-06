let privateKey = 'eead925b000a736c9052e33b9dc89d1eb5275a56';
let publicKey = '14f228c22c73b7038b6eb37f682c5d40';
let apiURL = 'https://gateway.marvel.com:443/v1/public/characters';

//generate key
let key = marvelKey(privateKey, publicKey);

let fullURL = `${apiURL}?${key}`;

async function getCharacters() {
  let data = await fetch(fullURL);
  let dataJSON = await data.json();

  let results = dataJSON.data.results;

  renderData(results);
}

//
getCharacters(); 



//search heroes
$('#seachBtn').on('click', async function () {
  let inputValue = $('#searchBar').val();
  let searchURL = `${apiURL}?${key}&nameStartsWith=${inputValue}`;

  let data = await fetch(searchURL);
  let searchHero = await data.json();

  let finalData = searchHero.data.results;

  renderData(finalData);
})

var searchBtn = $('#searchBtn');
searchBtn.on('click', async function (e) {
  var searchBar = $('#searchBar');
  var searchString = searchBar.val();

  var key = marvelKey(privateKey, publicKey);
  var fullURL = `${apiURL}?${key}&nameStartsWith=${searchString}`;

    let data = await fetch(fullURL);
    let item = await data.json();

    renderData(item.data.results);
})



// render data
function renderData(results) {
  let renderData = "";

  for (let i = 0; i < results.length; i++) {
    let name = results[i].name;
    let path = results[i].thumbnail.path;
    let extension = results[i].thumbnail.extension;
    let available = results[i].comics.available;

    renderData += `
    <a>
      <div class="character">
        <img src="${ path + '.' + extension}" alt="">
        <h5>${name}</h5>
        <h6>Comics : ${available}</h6>
    </a>
    </div>
    `
  }

  $('#content').html(renderData);

}