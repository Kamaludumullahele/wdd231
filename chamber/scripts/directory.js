const url = `data/members.json`;

const cards = document.querySelector(`#business-cards`);
const gridButton = document.querySelector("#gridButton");
const listButton = document.querySelector("#listButton");

async function getBusinessesData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        displayBusinesses(data.businesses);
    } catch (error) {
        console.error(error);
    }
}

const displayBusinesses = (businesses) => {
    const fragment = document.createDocumentFragment();

    businesses.forEach((business) => {
        const card = document.createElement("section");
        const logo = document.createElement("img");
        const businessName = document.createElement("h2");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const webAddress = document.createElement("a");

        businessName.textContent = business.name;
        address.textContent = business.address;
        phone.textContent = business.phone;
        webAddress.textContent = business.website;
        webAddress.href = business.website;

        logo.src = `images/${business.image}`;
        logo.alt = `Logo of ${business.name}`;
        logo.loading = "lazy";
        logo.width = 120;
        logo.height = 80;

        card.append(businessName, logo, address, phone, webAddress);
        fragment.appendChild(card);
    });

    cards.appendChild(fragment);
};

gridButton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

listButton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
    gridButton.setAttribute("aria-pressed", "false");
    listButton.setAttribute("aria-pressed", "true");
});

getBusinessesData();

const navButton = document.querySelector('#menu-button');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    const isOpen = navButton.classList.toggle('show');
    navButton.setAttribute('aria-expanded', isOpen);
    navBar.classList.toggle('show');
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;