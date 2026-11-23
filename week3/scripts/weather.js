// select html elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-caption');

// create required variables for the url
const myKey = "dba1e47a48b15f4e47a148530829fdcc"
const myLat = "49.74983180321823"
const myLong = "6.632967088992484"
// construct a full path using a template literals
const myUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

// try to grab the current weather data
async function apiFetch() {
    try {
        const response = await fetch(myUrl);
        if (response.ok) {
            const data = await response.json();
            displayResponse(data);
        } else {
            throw new Error(`Weather request failed (${response.status}): ${await response.text()}`);
        }
    } catch (error) {
        console.error(error);
    }
}

// display json data in on the web page
function displayResponse(data) {
    const description = data.weather[0].description;
    currentTemp.textContent = `${data.main.temp} °C`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = description;
    captionDesc.textContent = description;
}

apiFetch();