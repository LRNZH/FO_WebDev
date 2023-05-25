import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <strong>{part.name}</strong>
              <p>Exercise count: {part.exerciseCount}</p>
              <p>Description: {part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <strong>{part.name}</strong>
          <p>Exercise count: {part.exerciseCount}</p>
          <p>Group project count: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <strong>{part.name}</strong>
          <p>Exercise count: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
          <p>Background material: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <strong>{part.name}</strong>
          <p>Exercise count: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
          <p>Requirements: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return null;
  }
};

export default Part;
