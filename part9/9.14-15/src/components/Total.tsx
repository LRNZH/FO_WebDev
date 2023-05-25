import React from 'react';
import { TotalProps } from '../types'


const Total: React.FC<TotalProps> = ({ parts }) => {
  const totalExercises = parts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
