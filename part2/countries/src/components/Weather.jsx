/* eslint-disable react/prop-types */
import weatherService from '../services/weather'
import { useState } from 'react';


const Weather = ({ country }) => {

    const [temperature, setTemperature] = useState('');
    const [wind, setWind] = useState('');
    const [iconUrl, setIconUrl] = useState('');

    weatherService
        .getWeatherCapital(country)
        .then(response => {
            setTemperature(response.data.main.temp);
            setWind(response.data.wind.speed);
            const icon = response.data.weather[0].icon;
            setIconUrl(weatherService.getWeatherIconUrl(icon));
        })


    return (
        <div>
            <div>Temperature {temperature} Celsius</div>
            <img
                src={iconUrl}
                alt="weather icon"
            />
            <div>Wind {wind} m/s</div>
        </div>
    )
}



export default Weather