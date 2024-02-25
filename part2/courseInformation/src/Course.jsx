const Header = ({title}) => {
    return (
      <div>
        <h1>
          {title}
        </h1>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
          <Part part={part.name} exercise={part.exercises} key={part.id}/>
        )}
      </div>
    )
  }
  
  const Part = ({part, exercise, id}) => {
    return (
      <div>
        <p>
          {part} {exercise}
        </p>
      </div>
    )
  }
  
  const Total = ({course}) => {
    let exercisesNum = course.parts.map(part => part.exercises)
    let sum = exercisesNum.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    )
  
    return (
      <div>
        <strong>
          total of {sum} exercises
        </strong>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header title={course.name} />
        <Content parts={course.parts} />
        <Total course={course} />
      </div>
    )
  }

  export default Course