
let fetchLocationInfo = async()=> {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=4a601696b76c403da0d130526242602&q=NY`, {mode:'cors'});
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
}


function displayTodaysWeather(){
    let card = document.getElementById('main-card');
    fetchLocationInfo().then((result)=>{

        console.log(result)
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
        todayFeelsLike.innerHTML = `${result.current.feelslike_c}°C`;

        humidity.innerHTML = result.current.humidity + '%';
        wind.innerHTML = result.current.wind_kph + 'Km/h';
        date.innerHTML = (result.location.localtime).substr(8, 2) + '.';

        handleWeatherIcon(img, result.current.condition.code);
        
    })
}

displayTodaysWeather();