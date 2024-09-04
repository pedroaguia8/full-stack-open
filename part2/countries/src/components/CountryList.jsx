/* eslint-disable react/prop-types */
import CountryListItem from './CountryListItem'

const CountryList = ({ countries, toggleShowDetailed }) => {

    return (
        <div>
            {countries.map(item =>
                <CountryListItem key={item.cca3} country={item}
                    toggleShowDetailed={() => toggleShowDetailed(item)} />
            )}
        </div>
    )
}



export default CountryList