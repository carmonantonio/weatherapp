let appId ='c73f13b642d4df0e7f9571b9d756314c';
let units = 'metric';
let searchMetod;

function getSearchMethod (searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
        searchMetod = 'zip';
    }
    else{
        searchMetod ='q';
    }
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMetod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result =>{
        return result.json();
    }).then(result => {
        init(result);
    })

    
}

function init(resultFromServer){

    console.log(resultFromServer);
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("img/clear.jpg")';
            break;
        case 'Clouds':
                document.body.style.backgroundImage = 'url("img/cloudy.jpg")';
            break;
        
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
        case 'Haze':
                document.body.style.backgroundImage = 'url("img/rainy.jpg")';
            break;
        case 'Thunderstorm':
                document.body.style.backgroundImage = 'url("img/storm.jpg")';
            break;
        case 'snow':
                document.body.style.backgroundImage = 'url("img/snow.jpg")';
            break;
    
        default:
                document.body.style.backgroundImage = 'url("img/default.jpg")';
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humedityElement =document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconIMG');

    weatherIcon.src ='http://openweathermap.org/img/wn/'+resultFromServer.weather[0].icon +'@2x.png'
    
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase()+resultDescription.slice(1);
    temperatureElement.innerHTML= Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML ='El viendo está a: '+ Math.floor(resultFromServer.wind.speed) +' Km/h';
    humedityElement.innerHTML = 'La humedad es de: '+ resultFromServer.main.humidity+' %';
    cityHeader.innerHTML = resultFromServer.name;


}

document.getElementById('seachbtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm){
        searchWeather(searchTerm);
    }
})
