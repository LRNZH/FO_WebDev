const Course = (Props) => {
  return (
    <>
      <h1>{Props.header}</h1>
      <>
        {Props.text1} {Props.part} {Props.text2}
      </>
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  var parts = course.parts.map((numbers) => numbers.exercises);
  var sum = parts.reduce((a, b) => {
    return a + b;
  });

  return (
    <>
      <Course header={course.name} />
      <Course
        part={course.parts.map((part) => (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        ))}
      />
      <b>
        <Course text1="total of" part={sum} text2="exercises" />
      </b>
    </>
  );
};

export default App;
