import axios from 'axios'

const weatherKey = import.meta.env.VITE_WEATHER_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    return axios.get(`${baseUrl}/all`).then(response => response.data)
}

const getCountry = (name) => {
    return axios.get(`${baseUrl}/name/${name}`).then(response => response.data)
}

const getWeather = (capital) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${weatherKey}`
    return axios.get(url).then(response => response.data)
}

export default { getAll, getCountry, getWeather }