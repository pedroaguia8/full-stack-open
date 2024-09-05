import axios from 'axios';
const weatherBaseUrl = 'http://api.openweathermap.org/';
const weatherApiKey = import.meta.env.VITE_WEATHER_KEY;


const getWeatherCapital = country => {
    const request = axios.get(`${weatherBaseUrl}data/2.5/weather?q=${country.capital}
        &APPID=${weatherApiKey}&units=metric`);
    return request.then();
}

const getWeatherIconUrl = icon => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export default {
    getWeatherCapital, getWeatherIconUrl
}