
const searchBtn = document.getElementById('btnSearch');
const searchInput = document.getElementById('search');
const changeTempBtn = document.getElementById('tempBtn');
const container = document.getElementById('container');
const loading = document.getElementById('loading');

let fahrenheitTemperature = [];
let celsiusTemperature = [];

let feelsLikeFahrenheit = [];
let feelsLikeCelsius = [];

let kph = [];
let mph = [];

let fetchLocationInfo = async()=> {
        let searchValue = searchInput.value;
        container.style.display = 'none';
        loading.style.display = 'block';
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=4a601696b76c403da0d130526242602&q=${searchValue}`, {mode:'cors'});
        const infoJson = await response.json();
        //returned 2 objects, location and current, both containing their own info
        return infoJson;
};

let getTomorrowsInfo = async()=> {
    let searchValue = searchInput.value;
    const response = await fetch (`http://api.weatherapi.com/v1/forecast.json?key=4a601696b76c403da0d130526242602&q=${searchValue}&days=2&aqi=no&alerts=no`, {mode:'cors'})
    const infoJson = await response.json();
    container.style.display = 'flex';
    loading.style.display = 'none';
    return infoJson;
};

let getYesterdayInfo = async()=>{
    let searchValue = searchInput.value;
    let date = new Date();
    //converting mm dd yy format to yy mm dd
    //getting only the month day and year
    date.setDate(date.getDate() - 1);
    let dateStr = date.toString().substr(4,11);
    //making an array out of the date which contains values of year day and month
    //and then changing the places of month and day
    let output = dateStr.split(" ").reverse();
    let day = output[1];
    output[1] = output[2];
    output[2] = day;
    output = output.join("-");
    const response = await fetch (`http://api.weatherapi.com/v1/history.json?key=4a601696b76c403da0d130526242602&q=${searchValue}&dt=${output}`, {mode:'cors'})
    const infoJson = await response.json();
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
        img.src = 'imgs/partially-sunny.png'
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
        
            todayTempLabel.innerHTML = `Avg ${response.forecast.forecastday[0].day.avgtemp_c}°C`;   
            todayFeelsLike.innerHTML = `Max ${response.forecast.forecastday[0].day.maxtemp_c}°C`;
    
            celsiusTemperature.push(response.forecast.forecastday[0].day.avgtemp_c);
            fahrenheitTemperature.push(response.forecast.forecastday[0].day.avgtemp_f);

            feelsLikeFahrenheit.push(response.forecast.forecastday[0].day.maxtemp_f);
            feelsLikeCelsius.push(response.forecast.forecastday[0].day.maxtemp_c);

            humidity.innerHTML = response.forecast.forecastday[0].day.avghumidity + '%';
            wind.innerHTML = response.forecast.forecastday[0].day.maxwind_kph    + 'Km/h';
            date.innerHTML = (response.forecast.forecastday[0].date).substr(8, 2) + '.';

            kph.push(response.forecast.forecastday[0].day.maxwind_kph);
            mph.push(response.forecast.forecastday[0].day.maxwind_mph);
    
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

            celsiusTemperature.push(result.current.temp_c);
            fahrenheitTemperature.push(result.current.temp_f);

            feelsLikeFahrenheit.push(result.current.feelslike_f);
            feelsLikeCelsius.push(result.current.feelslike_c);
    
            humidity.innerHTML = result.current.humidity + '%';
            wind.innerHTML = result.current.wind_kph + 'Km/h';
            date.innerHTML = (result.location.localtime).substr(8, 2) + '.';

            kph.push(result.current.wind_kph);
            mph.push(result.current.wind_mph);
    
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
        
            todayTempLabel.innerHTML = `Avg ${response.forecast.forecastday[1].day.avgtemp_c}°C`;
            todayFeelsLike.innerHTML = `Max ${response.forecast.forecastday[1].day.maxtemp_c}°C`;
            
            celsiusTemperature.push(response.forecast.forecastday[1].day.avgtemp_c);
            fahrenheitTemperature.push(response.forecast.forecastday[1].day.avgtemp_f);

            feelsLikeFahrenheit.push(response.forecast.forecastday[1].day.maxtemp_f);
            feelsLikeCelsius.push(response.forecast.forecastday[1].day.maxtemp_c);
    
            humidity.innerHTML = response.forecast.forecastday[1].day.avghumidity + '%';
            wind.innerHTML = response.forecast.forecastday[1].day.maxwind_kph    + 'Km/h';
            date.innerHTML = (response.forecast.forecastday[1].date).substr(8, 2) + '.';

            kph.push(response.forecast.forecastday[1].day.maxwind_kph);
            mph.push(response.forecast.forecastday[1].day.maxwind_mph);
    
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

function emptyArrays() {
    for (let i = 0; i <= fahrenheitTemperature.length+1; i++){
        fahrenheitTemperature.pop();
        celsiusTemperature.pop();
        feelsLikeCelsius.pop();
        feelsLikeFahrenheit.pop();
        kph.pop();
        mph.pop();
    }
};

searchBtn.addEventListener('click', ()=>{
    emptyArrays();
    displayYesterdayWeather();
    displayTodaysWeather();
    displayTomorrowsWeather();
});

changeTempBtn.addEventListener('click', ()=>{
    let tempDisplays = document.querySelectorAll('.temp');
    let feelLikes = document.querySelectorAll('.feel-like');
    let winds = document.querySelectorAll('#wind');
    if(changeTempBtn.innerHTML === '°F') {
        if (fahrenheitTemperature.length !== 0) {
            changeTempBtn.innerHTML = '°C';
            for (let i=0; i<tempDisplays.length;i++){
                winds[i].innerHTML = mph[i] + 'Mp/h'
                if (i!==1) {
                    tempDisplays[i].innerHTML = 'Avg ' + fahrenheitTemperature[i] + '°F';
                    feelLikes[i].innerHTML = 'Max '+feelsLikeFahrenheit[i] + '°F';
                } else {
                    tempDisplays[i].innerHTML = fahrenheitTemperature[i] + '°F';
                    feelLikes[i].innerHTML = 'Feels like ' + feelsLikeFahrenheit[i] + '°F';
                }
            }
        }
    } else if (changeTempBtn.innerHTML === '°C') {
        if (fahrenheitTemperature.length !== 0) {
            changeTempBtn.innerHTML = '°F';
            for (let i=0; i<tempDisplays.length;i++){
                winds[i].innerHTML = kph[i] + 'Km/h';
                if (i!==1) {
                    tempDisplays[i].innerHTML = 'Avg ' + celsiusTemperature[i] + '°C';
                    feelLikes[i].innerHTML = 'Max ' + feelsLikeCelsius[i] + '°C';
                } else {
                    tempDisplays[i].innerHTML = celsiusTemperature[i] + '°C';
                    feelLikes[i].innerHTML = 'Feels like ' + feelsLikeCelsius[i] + '°C';
                }
            }
        }
    }
});

function staticSearch() {
    searchInput.value = "belgrade";    
    displayYesterdayWeather();
    displayTodaysWeather();
    displayTomorrowsWeather();
    searchInput.value = "";    
};

staticSearch()