//global variables
const url = "https://api.punkapi.com/v2/beers"
const ul = document.getElementById('beer-name')
const lowCheckbox = document.getElementById('low-abv')
const highCheckbox = document.getElementById('high-abv')
const extraHighCheckbox = document.getElementById('extra-high-abv')

let currentBeer = [];
//fetch
fetch(url)
    .then(res => res.json())
    .then(beers => {
        renderList(beers)
        currentBeer = beers
    })


//render list 
function renderList(beers) {
    beers.forEach(beer => {

        const li = document.createElement('li')
        const beerName = beer.name
        li.textContent = beerName
        ul.append(li)
    })
}

function renderLowAbv() {
    ul.replaceChildren()
    currentBeer.forEach(beer => {
        if (beer.abv >= 4 && beer.abv <= 6) {
            const span = document.createElement('span')
            const img = document.createElement('img')
            const imgSrc = beer['image_url']

            ul.append(span)
            span.append(img)
            img.src = imgSrc
        }
    })
}

function renderHighAbv() {
    ul.replaceChildren()
    currentBeer.forEach(beer => {
        if (beer.abv > 6 && beer.abv <= 10) {
            const span = document.createElement('span')
            const img = document.createElement('img')
            const imgSrc = beer['image_url']

            ul.append(span)
            span.append(img)
            img.src = imgSrc
        }
    })
}

function renderExtraHighAbv() {
    ul.replaceChildren()
    currentBeer.forEach(beer => {
        if (beer.abv > 10) {
            const span = document.createElement('span')
            const img = document.createElement('img')
            const imgSrc = beer['image_url']
            
            ul.append(span)
            span.append(img)
            img.src = imgSrc
        }
    })
}

//event listeners
lowCheckbox.addEventListener('change', renderLowAbv)
highCheckbox.addEventListener('change', renderHighAbv)
extraHighCheckbox.addEventListener('change', renderExtraHighAbv)