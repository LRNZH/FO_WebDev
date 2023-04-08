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
  const course = "Half Stack application development";
  const parts = [
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
  ];

  return (
    <div>
      <Header course={course} />
      <Content part1={parts[0].name} exercises1={parts[0].exercises} />
      <Content part2={parts[1].name} exercises2={parts[1].exercises} />
      <Content part3={parts[2].name} exercises3={parts[2].exercises} />
      <Total
        number={parts[0].exercises + parts[1].exercises + parts[2].exercises}
      />
    </div>
  );
};

export default App;
