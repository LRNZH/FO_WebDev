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
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
  return (
    <div>
      <Header course={course} />
      <Content part1={part1.name} exercises1={part1.exercises} />
      <Content part2={part2.name} exercises2={part2.exercises} />
      <Content part3={part3.name} exercises3={part3.exercises} />
      <Total number={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
