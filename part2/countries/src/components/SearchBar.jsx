const SearchBar = ({ countryFilter, onTextUpdated }) => {
    return (
        <form name={'country filter'} onSubmit={(e) => e.preventDefault()}>
            <div>
                find countries: <input value={countryFilter} onChange={onTextUpdated}/>
            </div>
        </form>
    )
}

export default SearchBar