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
        const card = document.createElement(`section`);
        const logo = document.createElement(`img`);
        const businessName = document.createElement(`h2`);
        const phone = document.createElement(`h3`)
        const webAddress = document.createElement(`url`);

        logo.textContent = `${business.name}`;
        logo.setAttribute(`src`, business.image);
        logo.setAttribute(`alt`, `logo of the business`);
        logo.setAttribute(`loading`, `lazy`);
        logo.setAttribute(`width`, `120`);
        logo.setAttribute(`height`, `80`);

        card.appendChild(businessName);
        card.appendChild(logo);
        cards.appendChild(card);

    })
}