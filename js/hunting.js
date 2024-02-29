const loadPhone = async (searchText = '13') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}


const displayPhones = phones => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');

    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    phones = phones.slice(0, 12);

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
            alt="phone" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);

    });
    toggleLoadingSpinner(false);
}

const handleShowDetails = async (id) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML =`
        <img src="${phone.image}" alt=""></img>
        <p><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
    `

    show_details_modal.showModal();
}

const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}


const handleShowAll = () => {

}

loadPhone();