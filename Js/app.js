const loadPhone = async (search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url)
    const data = await res.json()

    displayPhones(data.data)
}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerHTML = ''
    //display 20 phones only
    phones = phones.slice(0, 10)
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

}

const searchPhone = () => {
    const inputValue = document.getElementById('search-field')
    const inputText = inputValue.value
    loadPhone(inputText)
    inputValue.value = ''
}


