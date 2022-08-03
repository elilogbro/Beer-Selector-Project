//global variables
const url = "https://api.punkapi.com/v2/beers"
const ul = document.getElementById('beer-name')
const dropdown = document.getElementById('dropdown')

let beerList = [];
const detailImage = document.querySelector('#detail-image')
const detailName = document.querySelector('#detail-name')
const detailTagline = document.querySelector('#detail-tagline')
const detailDescription = document.querySelector('#detail-description')
const detailAbv = document.querySelector('#detail-abv')
const detailIbu = document.querySelector('#detail-ibu')
const ratingForm = document.querySelector('#rating-form')
const detailRating = document.querySelector('#detail-rating')

let currentBeer = {}
let count = 0

//fetch
fetch(url)
    .then(res => res.json())
    .then(beers => {
        renderList(beers)
        // beerList = beers
        handleForm()
    })

// render list     
function renderList(beers) {
    
    beers.forEach(beer => {
        const li = document.createElement('li')
        const beerName = beer.name
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
            filteredBeers = beers.filter(beer => beer.abv >= 4 && beer.abv <= 6);
            break;
        case '6-10% ABV' :
            filteredBeers = beers.filter(beer => beer.abv > 6 && beer.abv <=10);
            break;
        case '10+% ABV' :
            filteredBeers = beers.filter(beer => beer.abv > 10);
            break;
    }
    ul.textContent = ''
    renderList(filteredBeers)
}

//render beer details when clicked
function renderBeerDetails(beer) {
    currentBeer = beer
    count = 0
    detailName.textContent = beer.name
    detailImage.src = beer.image_url
    detailTagline.textContent = beer.tagline
    detailDescription.textContent = beer.description
    detailAbv.textContent = `ABV: ${beer.abv}`
    detailIbu.textContent = `IBU: ${beer.ibu}`
    currentBeer.rating = ""
    detailRating.textContent = `Rating: ${currentBeer.rating}`
}

//form functions
function handleForm() {
    ratingForm.addEventListener('submit', (e) => {
        e.preventDefault()
        count++
        currentBeer.rating = +e.target[id="rating"].value + +currentBeer.rating
        let averageRating = (currentBeer.rating) / count
        detailRating.textContent = `Rating: ${averageRating}`
        ratingForm.reset() 
    })
}

//event listeners
dropdown.addEventListener('change', () => abvRange(beerList))