const Country = ({ country, onShowClicked }) => {
    return (
        <li className='Country'>
            {country.name.common}
            <button className='ShowBtn' onClick={onShowClicked}>Show</button>
        </li>
    )
}

const CountryList = ({ countries, displayCountry }) => {
    return (
        <div>
            {countries.map((country, index) => <Country key={index} country={country} onShowClicked={() => displayCountry(country)} />)}
        </div>
    )
}

export default CountryList