import React from 'react';
import { HeaderProps } from '../types'

const Header: React.FC<HeaderProps> = ({ name }) => {
  return <h1>{name}</h1>;
};

export default Header;
