const loadPhone = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url)
    const data = await res.json()

    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerHTML = ''
    //display 10 phones only
    const showAll = document.getElementById('show-all')
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10)
        showAll.classList.remove('d-none')
    } else {
        showAll.classList.add('d-none')
    }

    //display no phones found
    const noFoundMessage = document.getElementById('no-found-message')
    if (phones.length === 0) {
        noFoundMessage.classList.remove('d-none')
    } else {
        noFoundMessage.classList.add('d-none')
    }
    //display all phones
    phones.forEach(phone => {
        console.log(phone)
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.</p>
        </div>
    </div>
        `
        phoneContainer.appendChild(phoneDiv)
    })
    //stop spinnner loader
    toggleSpinner(false)
}

const searchPhone = () => {
    processSearch(10)
}


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none')
    }
}
const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const inputValue = document.getElementById('search-field')
    //start loader
    const inputText = inputValue.value
    loadPhone(inputText, dataLimit)
}

//not the best way to load show ALL

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch()
})