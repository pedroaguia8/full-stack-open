/* eslint-disable react/prop-types */


const Country = ({ country }) => {

    const flagAltText = `flag of ${country.name.common}`;

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.svg} alt={flagAltText} width={200} />
        </div>
    )
}



export default Country