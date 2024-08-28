/* eslint-disable react/prop-types */

const Filter = ({ nameFilter, handleNameFilterChange }) => {

    return (
        <div>
            filter shown with <input value={nameFilter} onChange={handleNameFilterChange} />
        </div>
    )
}




export default Filter