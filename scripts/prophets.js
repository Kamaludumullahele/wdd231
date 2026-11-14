
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetsData(params) {
    try {
        const response = await fetch(`https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json`); //request
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json(); // parse the JSON data
        //console.table(data.prophets) 
        displayProphets(data.prophets);
    } catch (error) {
        console.error(error);
    }
}
getProphetsData();

const displayProphets = (prophets) => {
    prophets.forEach((prophets) => {
        //card build code goes here
        const card = document.createElement(`section`);
        const fullName = document.createElement(`${name} + ${lastname}`);
        const portrait = document.createElement(`imageurl`);

        // build the h2 content out to show the propht's full name
        fullName.textContent = `${prophet.name} lastname`;
    });
}