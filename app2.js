// select element: const element = document.querySelector(". className") 

const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

// App data
const weather= {};
weather.temperature = {
    unit:"celsius"
}

// App Contants and Vars
const KELVIN = 273;
//API Key
const key = "3f36a008bba9d213f7a6e6101f6588c1";

// check if browser support geolocation 
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>";
}
// Set user's position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude);
}
// Show error when there is an issue with geolocaiton service
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message} </p>`;
}


function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${key}`;
    
    //console.log(api); checking API works

    // Using API to catch the data
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then( function(data){
            weather.temperature.value = Math.floor(data.main.temp-KELVIN);
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;

            console.log(weather);
        })
        .then(function(){
            displayWeather();
        });

}


// Display weather to UI
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png">`; // backtick not single quote 
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = `${weather.description}`;
    locationElement.innerHTML =`${weather.city}, ${weather.country}` ;
}


function celsiusToFahrenheit(temp) {
    return (temp *9/5) + 32;
}

// click tempElement to change C <-> F
tempElement.addEventListener("click", function(){

    if(weather.temperature.value === "undefined") return;

    if(weather.temperature.unit === "celsius"){
        let tempC = weather.temperature.value;
        let tempF = celsiusToFahrenheit(tempC);
        tempF = Math.floor(tempF);
        tempElement.innerHTML = `${tempF}° <span>F</span>`;
        weather.temperature.unit = "fahrenheit"
    } else {
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit = "celsius";
    }   
});





/*Object called weather, these won't type by hand, using API


const weather = {
    temperature : {
        value: 18,
        unit:"celsius"
    },
    
    description: "few clouds",
    
    iconId: "01d",

    city: "London",
    
    country:"GB"
};

*/

