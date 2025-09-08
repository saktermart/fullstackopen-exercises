import { useEffect, useState } from 'react'
import countriesService from '../services/countries'

const getIcon = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png` 
const kelvinToCelsius = (kelvin) => Math.round(100*(kelvin - 273))/100

const WeatherInfo = ({ capital, weatherData }) => {
    return (
        <div>
            <h1>Weather in {capital}</h1>
            <p>Temperature {kelvinToCelsius(weatherData.main.temp)} Celsius</p>
            <img src={getIcon(weatherData.weather[0].icon)}></img>
            <p>Wind {weatherData.wind.speed} m/s</p>
        </div>
    )
}

const CountryInfo = ({ country }) => {
    const { name, area, languages, flags, capital } = country
    const theCapital = capital[0]

    const [weatherData, setWeatherData] = useState(null)
    useEffect(() => {
        countriesService.getWeather(theCapital).then(initialWeatherData => {
            setWeatherData(initialWeatherData)
        })
    }, [theCapital])

    return (
        <div>
            <h1>{name.common}</h1>
            <p>Capital {theCapital}</p>
            <p>Area {area}</p>

            <h1>Languages</h1>
            {Object.entries(languages).map(([key, language]) => <li key={key}>{language}</li>)}

            <img src={flags.png} alt={flags.alt} /> 
            {weatherData && <WeatherInfo capital={theCapital} weatherData={weatherData}/>}
        </div>
    )
}

export default CountryInfo