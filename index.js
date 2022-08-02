//global variables
const url = "https://api.punkapi.com/v2/beers"
const ul = document.getElementById('beer-name')
const dropdown = document.getElementById('dropdown')

let beerList = [];

//fetch
fetch(url)
    .then(res => res.json())
    .then(beers => {
        renderList(beers)
        beerList = beers
    })

// render list     
function renderList(beers) {
    
    beers.forEach(beer => {
        const li = document.createElement('li')
        const beerName = beer.name
        li.textContent = beerName
        ul.append(li)
    })
}

//switch case for finding abv
function abvRange(beerList) {
    const abv = dropdown.value
    let filteredBeers
    switch(abv) {
        case '4-6% ABV' :
            filteredBeers = beerList.filter(beer => beer.abv >= 4 && beer.abv <= 6);
            break;
        case '6-10% ABV' :
            filteredBeers = beerList.filter(beer => beer.abv > 6 && beer.abv <=10);
            break;
        case '10+% ABV' :
            filteredBeers = beerList.filter(beer => beer.abv > 10);
            break;
    }
    ul.textContent = ''
    renderList(filteredBeers)
}

//event listeners
dropdown.addEventListener('change', () => abvRange(beerList))