// Api call 
const apikey = `cf9f2a017bed0a2df147dca38fcbf79c`;


 async function fetchWeatherData (city){
   try { const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
    );

    if (! response.ok){
        throw new Error ("Unable to fetch weather Data");
    }
    const data = await response.json();
    console.log(data);
    updateWeatherUI(data);
}
catch(error){
    console.log(error);
}
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");

// to make a function for Api

function updateWeatherUI(data){
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility /1000} km`;
    descriptionText.textContent = data.weather[0].description;
    
    const currentDate = new Date ();
    date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = ` <i class="material-icons">${weatherIconName}</i>`;
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const city = inputElement.value;
    if(city !== ""){
        fetchWeatherData(city);
        inputElement.value = " ";
    }
})

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        clear:"web_sunny",
        clouds:"web_clouds",
        Rain:"umbrella",
        Thunderstrom:"flash_on",
        Drizzle:"grain",
        Snow:"ac_unit",
        Mist:"cloud",
        Smoke:"cloud",
        Haze:"cloud",
        Fog:"cloud",
    };

    return iconMap [weatherCondition] || "help"
}