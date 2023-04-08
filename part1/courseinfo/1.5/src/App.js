const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      <div>
        {" "}
        {props.part1} {props.exercises1}{" "}
      </div>
      <div>
        {" "}
        {props.part2} {props.exercises2}{" "}
      </div>
      <div>
        {" "}
        {props.part3} {props.exercises3}{" "}
      </div>
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>Number of Exercises {props.number}</p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content
        part1={course.parts[0].name}
        exercises1={course.parts[0].exercises}
      />
      <Content
        part2={course.parts[1].name}
        exercises2={course.parts[1].exercises}
      />
      <Content
        part3={course.parts[2].name}
        exercises3={course.parts[2].exercises}
      />
      <Total
        number={
          course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises
        }
      />
    </div>
  );
};

export default App;
