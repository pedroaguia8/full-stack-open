import Part from './Part'
import Total from './Total'

const Content = ({ course, totalExercises }) => {

    return (
        <>
            {course.parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
            <Total totalExercises={totalExercises} />
        </>

    )


}


export default Content