import Header from './Header'
import Content from './Content'

const Course = ({ course, totalExercises }) => {




    return (
        <>
            <Header course={course} />
            <Content course={course} totalExercises={totalExercises} />
        </>


    )


}



export default Course