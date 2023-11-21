console.log('%c HI', 'color: firebrick')

function handleChange(e){
    const valueSelected = e.target.value
    const breeds = document.querySelector("#dog-breeds")
    let listOfBreeds = breeds.children
    for(breed of listOfBreeds) {
        let firstLetter = breed.innerHTML[0]
        if(firstLetter !== valueSelected){
            breed.style.display = 'none'
        }
    }
}

function initializeDropDown() {
    const dropDown = document.querySelector("#breed-dropdown")
    dropDown.addEventListener("change", handleChange)
}

//changes color of breed name clicked
function handleClick(e) {
    e.target.style.color = "red"
}

//Renders dogs to the dom in a list of images
function renderDog(dog) {
    let dogContainer = document.querySelector("#dog-image-container")
    let dogCard = document.createElement("li")
    dogCard.className = "dog"
    dogCard.innerHTML = `
        <img src="${dog}">
    `
    //Adds dog card to the DOM    
    dogContainer.appendChild(dogCard)
}

//Renders breeds to the dom in a list
function renderBreed(breed) {
    let breedContainer = document.querySelector("#dog-breeds")
    let breedCard = document.createElement("li")
    breedCard.className = "breed"
    breedCard.innerHTML = breed
    //Adds dog card to the DOM   
    breedContainer.appendChild(breedCard)

    //Adds event listener to li
    breedCard.addEventListener("click", handleClick)
}

//Fetch Requests
//GETS all dogs from API
function getDogs() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res => res.json())
    .then(dogData => dogData.message.forEach(dog => renderDog(dog)))
}

//GETS all dog breeds from API
function getBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(res => res.json())
    .then(dogBreed => {
        const dogBreeds = Object.keys(dogBreed.message)
        dogBreeds.forEach(breed => renderBreed(breed))
    })
}

//Gets the data and renders dogs to the DOM
function initialize(){
    getDogs()
    getBreeds()
    initializeDropDown()
}

initialize()