/* eslint-disable react/prop-types */

const Person = ({ person, deletePerson }) => {

    return (
        <>
            <li>
                <div>{person.name}</div>
                <div>{person.number}</div>
                <button type="button" onClick={deletePerson}>Delete</button>
            </li>
        </>
    )
}




export default Person