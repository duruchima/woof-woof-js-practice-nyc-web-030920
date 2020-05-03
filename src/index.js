let dogUrl = `http://localhost:3000/pups`
document.addEventListener("DOMContentLoaded", function () {
    let dogFilter = document.getElementById('good-dog-filter')
    console.log(dogFilter.id)
    let dogBar = document.getElementById('dog-bar')
    let dogInfo = document.getElementById('dog-info')
    function showAllDogs(){
    dogBar.innerHTML = ''
    fetch(dogUrl)
    .then(resp => resp.json())
    .then(dogs => dogs.forEach(dog => addDogsToDogBar(dog)))}

    function addDogsToDogBar(dog){
        let dogSpan = document.createElement('span')   
        dogSpan.innerText = `${dog.name}`
        dogSpan.dataset.id = dog.id
        dogSpan.dataset.good = dog.isGoodDog
        dogSpan.className += 'dog'
        dogSpan.dataset.img = dog.image
        dogBar.append(dogSpan)
    }//closes add DogstoDogBar

document.addEventListener('click', e => {
    if (e.target.className === 'dog'){
        showDog(e.target)}
    else if(e.target.id === `${dogFilter.id}`){
        console.log(e.target.innerText)
        if(e.target.innerText === 'Filter good dogs: OFF'){e.target.innerText = 'Filter good dogs: ON', applyGoodDogFilter()}
        else if(e.target.innerText === 'Filter good dogs: ON'){e.target.innerText = 'Filter good dogs: OFF', showAllDogs()}
    }
    else if (e.target.className === 'button'){
        if(e.target.dataset.good === 'true'){e.target.innerText = 'Bad Dog', e.target.dataset.good = false, updateDog(e.target)}
        else if(e.target.dataset.good === 'false'){e.target.innerText = 'Good Dog', e.target.dataset.good = true, updateDog(e.target)}
    // else if (e.target.id === dogFilter.id){console.log('listening')}
    
    }
}) //closes click listener
    function showDog(dog){
        if(dog.dataset.good === 'true'){dogInfo.innerHTML = `<img src=${dog.dataset.img}></img>
        <h2>${dog.innerText}</h2><button data-id=${dog.dataset.id} data-good=${dog.dataset.good} type="button" class="button">Good Dog</button>`}
        else if (dog.dataset.good === 'false'){dogInfo.innerHTML = `<img src=${dog.dataset.img}></img>
        <h2>${dog.innerText}</h2><button data-id=${dog.dataset.id} data-good=${dog.dataset.good} type="button" class="button">Bad Dog</button>`}
    }//closes showDog

    function updateDog(dog){
        fetch(`${dogUrl}/${dog.dataset.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "isGoodDog": dog.dataset.good
            })//closes body
        })//closes fetch

    }

    function applyGoodDogFilter(){
    dogBar.innerHTML = ''
    fetch(dogUrl)
    .then(resp => resp.json())
    .then(dogs => dogs.forEach(dog => addGoodDogsToDogBar(dog)))}//closes applyGoodDogFilter

    function addGoodDogsToDogBar(dog){
        let dogSpan = document.createElement('span')   
        if(dog.isGoodDog === 'true'){
        dogSpan.innerText = `${dog.name}`
        dogSpan.dataset.id = dog.id
        dogSpan.dataset.good = dog.isGoodDog
        dogSpan.className += 'dog'
        dogSpan.dataset.img = dog.image
        dogBar.append(dogSpan)}
    }
    showAllDogs()


})//closes domcontentloaded 