//global variables
const url = "https://api.punkapi.com/v2/beers"
const ul = document.getElementById('beer-name')
const dropdown = document.getElementById('dropdown')

const detailImage = document.querySelector('#detail-image')
const detailName = document.querySelector('#detail-name')
const detailTagline = document.querySelector('#detail-tagline')
const detailDescription = document.querySelector('#detail-description')
const detailAbv = document.querySelector('#detail-abv')
const detailIbu = document.querySelector('#detail-ibu')
const ratingForm = document.querySelector('#rating-form')
const detailRating = document.querySelector('#detail-rating')
const triedButton = document.querySelector('#tried-untried')

let currentBeer = {}
let count = 0

//fetch
fetch(url)
    .then(res => res.json())
    .then(beers => {
        renderList(beers)
        handleDropdown(beers)
        handleForm()
        handleTriedButton()
        beers.forEach(beer => {
            beer.tried = false
            // beer.rating = 0
        })
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

//handle dropdown selection
function handleDropdown(beers) {
    dropdown.addEventListener('change', () => abvRange(beers))
}

//switch case for finding abv
function abvRange(beers) {
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
        case 'All' :
            filteredBeers = beers
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
    triedButton.textContent = currentBeer.tried ? " Tried " : " Not tried yet "
}

//handle form submission
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

//handle tried button
function handleTriedButton() {
    triedButton.addEventListener("click", () => {
        currentBeer.tried = !currentBeer.tried
        triedButton.textContent = currentBeer.tried ? " Tried " : " Not tried yet "
    })
}