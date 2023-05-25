import React from 'react';
import { ContentProps } from '../types';
import Part from './Part';

const Content: React.FC<ContentProps> = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};

export default Content;
