const url = `https://kamaludumullahele.github.io/wdd231/chamber/data/members.json`;

const cards = document.querySelector(`#business-cards`);
const gridButton = document.querySelector("#gridButton");
const listButton = document.querySelector("#listButton");
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
// adding button functionality
gridButton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

listButton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

getBusinessesData();


// adding footer content 
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;