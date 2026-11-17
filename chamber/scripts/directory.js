const url = `https://kamaludumullahele.github.io/wdd231/chamber/data/members.json`;

const cards = document.querySelector(`#cards`);
// creating a async/await
async function getBusinessesData(params) {
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
    businesses.forEach((business) => {
        const card = document.createElement("section");
        const logo = document.createElement("img");
        const businessName = document.createElement("h2");
        const phone = document.createElement("p");
        const webAddress = document.createElement("a");

        businessName.textContent = business.name;
        phone.textContent = business.phone;
        webAddress.textContent = business.website;
        webAddress.href = business.website;

        logo.src = `images/${business.image}`;
        logo.alt = `Logo of ${business.name}`;
        logo.loading = "lazy";
        logo.width = 120;
        logo.height = 80;

        card.append(businessName, logo, phone, webAddress);
        cards.appendChild(card);
    });
};

getBusinessesData();

// adding grid and list buttons
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

// adding footer content 
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;