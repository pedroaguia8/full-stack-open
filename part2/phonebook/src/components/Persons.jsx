/* eslint-disable react/prop-types */
import Person from './Person'

const Persons = ({ personsToShow, deletePerson }) => {

    return (
        <ul>
            {personsToShow.map(person =>
                <Person key={person.name} person={person}
                    deletePerson={() => deletePerson(person)} />
            )}
        </ul>
    )
}


export default Persons