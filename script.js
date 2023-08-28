const loadPhoneData = async (searchText, isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const phoneData = await response.json();
    const phones = phoneData.data;
    displayData(phones, isShowAll);
}

const displayData = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('card-section-id');
    phoneContainer.textContent = '';

    // show all button function

    const show = document.getElementById('show-button');
    if (phones.length > 6 && !isShowAll) {
        show.classList.remove('show-more-button');
    }
    else {
        show.classList.add('show-more-button');
    }
    // Display 6 phones
    if (!isShowAll) {
        phones = phones.slice(0, 6);
    }

    phones.forEach(phone => {
        const phoneDisplay = document.createElement('div');

        phoneDisplay.innerHTML = `
        <div class="card-container">
        <div class="image">
            <img src="${phone.image}" alt="">
        </div>
        <h5>${phone.phone_name}</h5>
        <br>
        <h5>$900</h5>
        <br>
        <button class="show-details-button" onclick="showDetails('${phone.slug}')" id="show-details" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
        </div>
        `
        phoneContainer.appendChild(phoneDisplay);
    });
    toggleSearch(false);
}

// search button

const searchButton = (isShowAll) => {
    toggleSearch(true);
    const searchId = document.getElementById('search-text');
    const searchText = searchId.value;
    loadPhoneData(searchText, isShowAll);
}

const toggleSearch = (isLoading) => {
    const toggleSpinner = document.getElementById('spinner');
    if (isLoading) {
        toggleSpinner.classList.remove('collapse');
    }
    else {
        toggleSpinner.classList.add('collapse');
    }
}

const showAll = () => {
    searchButton(true);
}

const showDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phoneDetails = data.data;
    console.log(phoneDetails);

    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phoneDetails.name;

    const modalImage = document.getElementById('modal-Image');

    modalImage.innerHTML = '';


    const modalImageContainer = document.createElement('div');
    modalImageContainer.innerHTML = `
    <img src="${phoneDetails.image}" alt="">
    <br>
    <br>
    <p>Brand : ${phoneDetails.brand}</p>
    <p>Chipset : ${phoneDetails.mainFeatures.chipSet}</p>
    <p>Display Size : ${phoneDetails.mainFeatures.displaySize}</p>
    <p>Memory : ${phoneDetails.mainFeatures.memory}</p>
    <p>Storage : ${phoneDetails.mainFeatures.storage}</p>
    <p>Release Date : ${phoneDetails.releaseDate}</p>
    `
    modalImage.appendChild(modalImageContainer);
}
