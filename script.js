
const searchBtn = document.getElementById('btnSearch');
const searchInput = document.getElementById('search');

let fetchLocationInfo = async()=> {
        let searchValue = searchInput.value;
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=4a601696b76c403da0d130526242602&q=${searchValue}`, {mode:'cors'});
        const infoJson = await response.json();
        //returned 2 objects, location and current, both containing their own info
        return infoJson;
};


function displayLocation(city, country) {
    let cityTitle = document.getElementById('city');
    let countryTitle = document.getElementById('country');

    cityTitle.innerHTML = city;
    countryTitle.innerHTML = country;
};

function handleWeatherIcon(img, code){
//condition codes and their meaning found at: https://www.weatherapi.com/docs/weather_conditions.json
switch (code) {
    case 1000:
    case 1003:
        img.src = 'imgs/sunny.png'
        break;
    case 1006:
    case 1009:
        img.src = 'imgs/cloudy.png'
        break;
    case 1147:
    case 1135:
    case 1030:
        img.src = 'imgs/mist.png'
        break;
    case 1150:
    case 1153:
    case 1087:
    case 1063:
    case 1180:
    case 1183:
    case 1186:
    case 1189:
    case 1192:
    case 1195:
    case 1198:
    case 1201:
    case 1240:
    case 1243:
    case 1246:
    case 1249:
    case 1273:
    case 1276:
        img.src = 'imgs/rainy.png'
        break;
    case 1279:
    case 1282:
    case 1114:
    case 1117:
    case 1072:
    case 1069:
    case 1066:
    case 1168:
    case 1171:
    case 1204:
    case 1207:
    case 1210:
    case 1213:
    case 1216:
    case 1219:
    case 1222:
    case 1225:
    case 1237:
    case 1252:
    case 1255:
    case 1258:
    case 1261:
    case 1264:
        img.src = 'imgs/snowy.png'
        break;
    
}
};

function displayTodaysWeather(){
    let card = document.getElementById('main-card');
    fetchLocationInfo().then((result)=>{

        if (!result.error) {
            //display location info in header
            displayLocation(result.location.name, result.location.country);
            //display card info
            let todayTempLabel = card.querySelector('.temp');
            let todayFeelsLike = card.querySelector('.feel-like');
    
            let humidity = card.querySelector('#humidity');
            let wind = card.querySelector('#wind');
            let date = card.querySelector('#date');
            let img = card.querySelector('#weather-img');
        
            todayTempLabel.innerHTML = `${result.current.temp_c}°C`;
            todayFeelsLike.innerHTML = `Feels like ${result.current.feelslike_c}°C`;
    
            humidity.innerHTML = result.current.humidity + '%';
            wind.innerHTML = result.current.wind_kph + 'Km/h';
            date.innerHTML = (result.location.localtime).substr(8, 2) + '.';
    
            handleWeatherIcon(img, result.current.condition.code);
            if (searchInput.placeholder === 'No location found') {
                searchInput.placeholder = 'Search';
            }
        } else if(result.error){
            searchInput.value = '';
            searchInput.placeholder = 'No location found';
        }
        
    })
};

let getTomorrowsInfo = async()=> {
    let searchValue = searchInput.value;
    const response = await fetch (`http://api.weatherapi.com/v1/forecast.json?key=4a601696b76c403da0d130526242602&q=${searchValue}&days=2&aqi=no&alerts=no`, {mode:'cors'})
    const infoJson = await response.json();
    return infoJson;
};

let getYesterdayInfo = async()=>{
    let searchValue = searchInput.value;
    let date = new Date();
    date.setDate(date.getDate() - 1);
    const response = await fetch (`http://api.weatherapi.com/v1/history.json?key=4a601696b76c403da0d130526242602&q=${searchValue}&dt=2024-02-29`, {mode:'cors'})
    const infoJson = await response.json();
    return infoJson;
}

function displayTomorrowsWeather(){
    let card = document.getElementById('tomorrowCard');
    getTomorrowsInfo().then((response)=>{
        if (!response.error) {
            //display card info
            let todayTempLabel = card.querySelector('.temp');
            let todayFeelsLike = card.querySelector('.feel-like');
    
            let humidity = card.querySelector('#humidity');
            let wind = card.querySelector('#wind');
            let date = card.querySelector('#date');
            let img = card.querySelector('#weather-img');
        
            todayTempLabel.innerHTML = `${response.forecast.forecastday[1].day.avgtemp_c}°C`;
            todayFeelsLike.innerHTML = `Max ${response.forecast.forecastday[1].day.maxtemp_c}°C`;
    
            humidity.innerHTML = response.forecast.forecastday[1].day.avghumidity + '%';
            wind.innerHTML = response.forecast.forecastday[1].day.maxwind_kph    + 'Km/h';
            date.innerHTML = (response.forecast.forecastday[1].date).substr(8, 2) + '.';
    
            handleWeatherIcon(img, response.forecast.forecastday[1].day.condition.code);
            if (searchInput.placeholder === 'No location found') {
                searchInput.placeholder = 'Search';
            };

        } else if(result.error){
            searchInput.value = '';
            searchInput.placeholder = 'No location found';
        }
    })
};

function displayYesterdayWeather(){
    let card = document.getElementById('yesterdayCard');
    getYesterdayInfo().then((response)=>{
        if (!response.error) {
            //display card info
            let todayTempLabel = card.querySelector('.temp');
            let todayFeelsLike = card.querySelector('.feel-like');
    
            let humidity = card.querySelector('#humidity');
            let wind = card.querySelector('#wind');
            let date = card.querySelector('#date');
            let img = card.querySelector('#weather-img');
        
            todayTempLabel.innerHTML = `${response.forecast.forecastday[0].day.avgtemp_c}°C`;   
            todayFeelsLike.innerHTML = `Max ${response.forecast.forecastday[0].day.maxtemp_c}°C`;
    
            humidity.innerHTML = response.forecast.forecastday[0].day.avghumidity + '%';
            wind.innerHTML = response.forecast.forecastday[0].day.maxwind_kph    + 'Km/h';
            date.innerHTML = (response.forecast.forecastday[0].date).substr(8, 2) + '.';
    
            handleWeatherIcon(img, response.forecast.forecastday[0].day.condition.code);
            if (searchInput.placeholder === 'No location found') {
                searchInput.placeholder = 'Search';
            };

        } else if(result.error){
            searchInput.value = '';
            searchInput.placeholder = 'No location found';
        }
    })
};

searchBtn.addEventListener('click', ()=>{
    displayTodaysWeather();
    displayTomorrowsWeather();
    displayYesterdayWeather();
});