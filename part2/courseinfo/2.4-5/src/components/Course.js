import React from "react";

const Course = ({ courses }) => (
  <div>
    {courses.map((course) => (
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </div>
);

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part, i) => (
      <Parts key={i} part={part.name} exercises={part.exercises} />
    ))}
  </div>
);

const Parts = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return <b>Number of exercises {total}</b>;
};

export default Course;
