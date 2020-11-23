const url = 'http://localhost:3000/pups'
let filterDoge = false

document.addEventListener("DOMContentLoaded", () => {
    getDoggo()
    let filter = document.getElementById('good-dog-filter')
    filter.addEventListener('click', () => {
        filterDoge = !filterDoge
        if (filterDoge){filter.innerText = "Filter good dogs: ON";
        document.querySelectorAll(".false").forEach((dogo) => dogo.style.display = "none")}
        else{filter.innerText = "Filter good dogs: OFF";
        document.querySelectorAll(".false").forEach((dogo) => dogo.style.display = "flex")}
    })
})

function getDoggo(){
    fetch(url)
    .then((response) => response.json())
    .then((dogArray) => dogArray.forEach((dog) => {
        renderDoggo(dog)
    }))
}

function renderDoggo(dog){
    let dogBar = document.getElementById('dog-bar')
    
    let dogSpanTag = document.createElement('span')

    dogSpanTag.className = dog.isGoodDog

    dogSpanTag.innerText = dog.name

    dogSpanTag.id = dog.id

    dogSpanTag.addEventListener('click', (event) => {
        fetchDog(event)
    })



    dogBar.append(dogSpanTag)
}

function fetchDog(event){
    let dogId = event.target.id

    fetch(`${url}/${dogId}`)
    .then((response) => response.json())
    .then((dog) => displayDog(dog))

}

function displayDog(dog){
    let dogInfo = document.getElementById('dog-info')
    
    let img = document.createElement('img')
    img.src = dog.image
    
    let dogName = document.createElement('h2')
    dogName = dog.name

    let isGudDog = document.createElement('button')
    isGudDog.id = 'toggle'

    dog.isGoodDog ? isGudDog.innerText = "IS GOOD DOG": isGudDog.innerText = "IS BAD DOG"
    isGudDog.addEventListener('click', (event) => {
        toggleDog(dog)
    })

    // dogInfo.childNodes.forEach((node) => node.remove())
    dogInfo.innerHTML = ""
    dogInfo.append(img, dogName, isGudDog)
    
}

function toggleDog(dog){
    let isGudDog = document.getElementById('toggle')
    dog.isGoodDog = !dog.isGoodDog

    let dogId = document.getElementById(dog.id)

    dogId.className = dog.isGoodDog

    fetch(`${url}/${dog.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({isGoodDog: dog.isGoodDog})
    })
    .then((response) => response.json())
    .then(dog.isGoodDog ? isGudDog.innerText = "IS GOOD DOG": isGudDog.innerText = "IS BAD DOG")
}

// The button's text should change from "Filter good dogs: OFF" to "Filter good dogs: ON", or vice versa.
// If the button now says "ON" (meaning the filter is on), then the Dog Bar should only show pups whose isGoodDog attribute is true. If the filter is off, the Dog Bar should show all pups (like normal).