const loadPhoneData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const phoneData = await response.json();
    const phones = phoneData.data;
    displayData(phones);
}

const displayData = phones => {
    const phoneContainer = document.getElementById('card-section-id');
    phones.forEach(phone => {
        const phoneDisplay = document.createElement('div');

        phoneDisplay.innerHTML = `
        <div class="card-container">
        <div class="image">
            <img src="${phone.image}" alt="">
        </div>
        <h5>${phone.phone_name}</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, cum.</p>
        <h5>$900</h5>
        <button class="show-details-button">Show Details</button>
        </div>
        `
        phoneContainer.appendChild(phoneDisplay);
    })
}
loadPhoneData();