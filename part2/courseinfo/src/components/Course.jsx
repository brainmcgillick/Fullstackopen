const Header = ({course}) => {
    return (
      <>
        <h1>{course.name}</h1>
      </>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => 
          <Part key={part.id} part={part} />
        )}
        <Total total={parts.reduce((sum, part) => sum + part.exercises, 0)} />
      </>
    )
  }
  
  const Part = ({part}) => {
    return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
    )
  }
  
  const Total = ({total}) => {
    return (
      <strong><p>Number of exercises {total}</p></strong>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
        <Header course={course} />
        <Content parts ={course.parts} />
      </>
    )
  }

  export default Course