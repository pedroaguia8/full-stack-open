/* eslint-disable react/prop-types */
import Country from './Country'


const CountryListItem = ({ country, toggleShowDetailed }) => {

    return (
        <div>
            {country.name.common} <button value={country.name.common} type='button' onClick={toggleShowDetailed}>show</button>
            {country.showDetailed &&
                <Country country={country} />}
        </div>
    )


}


export default CountryListItem