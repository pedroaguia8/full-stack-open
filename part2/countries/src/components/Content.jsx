/* eslint-disable react/prop-types */
import Country from './Country'
import CountryList from './CountryList'

const Content = ({ countries }) => {

    return (
        <div>
            {countries.length > 10 ? (
                <>Too many matches, specify another filter</>
            ) : countries.length === 1 ? (
                <Country country={countries[0]} />
            ) : (
                <CountryList countries={countries} />
            )
            }
        </div>
    )
}


export default Content