//global variables
const url = "https://api.punkapi.com/v2/beers"
const ul = document.getElementById('beer-name')
const dropdown = document.getElementById('dropdown')

let beerList = [];
const lowCheckbox = document.getElementById('low-abv')
const highCheckbox = document.getElementById('high-abv')
const extraHighCheckbox = document.getElementById('extra-high-abv')
const detailImage = document.querySelector('#detail-image')
const detailName = document.querySelector('#detail-name')
const detailTagline = document.querySelector('#detail-tagline')
const detailDescription = document.querySelector('#detail-description')
const detailAbv = document.querySelector('#detail-abv')
const detailIbu = document.querySelector('#detail-ibu')

// let currentBeer = [];
let currentBeer = {}

//fetch
fetch(url)
    .then(res => res.json())
    .then(beers => {
        renderList(beers)
        beerList = beers
        // currentBeer = beers
    })

// render list     
function renderList(beers) {
    
    beers.forEach(beer => {
        const li = document.createElement('li')
        const beerName = beer.name
        if (beer.abv <= 6) {
            li.className = "low-ABV"
        }
        else if (beer.abv > 6 && beer.abv <= 10) {
            li.className = "high-ABV"
        }
        else {
            li.className = "extra-high-ABV"
        }
        li.textContent = beerName
        ul.append(li)
        li.addEventListener('click', () => renderBeerDetails(beer))
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

function renderBeerDetails(beer) {
    currentBeer = beer 
    detailName.textContent = beer.name
    detailImage.src = beer.image_url
    detailTagline.textContent = beer.tagline
    detailDescription.textContent = beer.description
    detailAbv.textContent = `ABV: ${beer.abv}`
    detailIbu.textContent = `IBU: ${beer.ibu}`
}

//event listeners
dropdown.addEventListener('change', () => abvRange(beerList))