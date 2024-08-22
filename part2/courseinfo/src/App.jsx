import Course from './components/Course'

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  const sumExercises = () => {
    let total = 0
    course.parts.forEach(part => {
      total += part.exercises
    })
    return total
  }

  const totalExercises = sumExercises()


  return <Course course={course} totalExercises={totalExercises} />
}

export default App