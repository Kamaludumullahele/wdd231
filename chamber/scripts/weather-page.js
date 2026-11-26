// select html elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-caption');

// create required variables for the url
const myKey = "dba1e47a48b15f4e47a148530829fdcc"
const myLat = "51.04733049381374"
const myLong = "-114.06874511992208"
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
    weatherIcon.hidden = false;
}
apiFetch();

// adding code for forecast
const forecastElement = document.querySelector("#forecast");
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

async function getForecast() {
    try {
        const response = await fetch(forecastUrl);

        if (!response.ok) {
            throw new Error(`Forecast request failed: ${response.status}`);
        }

        const data = await response.json();
        forecastElement.textContent = "";

        const daysShown = new Set();

        for (const item of data.list) {
            const date = new Date(item.dt * 1000);

            const day = new Intl.DateTimeFormat("en-CA", {
                timeZone: "America/Edmonton",
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).format(date);

            if (daysShown.has(day)) continue;
            if (daysShown.size === 3) break;

            daysShown.add(day);

            const label = new Intl.DateTimeFormat("en-CA", {
                timeZone: "America/Edmonton",
                weekday: "short",
                month: "short",
                day: "numeric"
            }).format(date);

            const entry = document.createElement("p");
            entry.textContent = label;

            const temperature = document.createElement("span");
            temperature.textContent = `${Math.round(item.main.temp)} °C`;
            entry.appendChild(temperature);

            const icon = document.createElement("img");
            icon.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
            icon.alt = item.weather[0].description;

            const description = document.createElement("span");
            description.classList.add("forecast-description");
            description.textContent = item.weather[0].description;

            entry.appendChild(icon);
            entry.appendChild(description);
            forecastElement.appendChild(entry);
        }
    } catch (error) {
        console.error("Could not load forecast:", error);
        forecastElement.textContent = "Forecast unavailable";
    }
}

getForecast();
