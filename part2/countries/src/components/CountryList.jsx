/* eslint-disable react/prop-types */
import CountryListItem from './CountryListItem'

const CountryList = ({ countries }) => {

    return (
        <div>
            {countries.map(item =>
                <CountryListItem key={item.cca3} name={item.name.common} />
            )}
        </div>
    )
}



export default CountryList