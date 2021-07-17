import React, { FC } from 'react';

interface ButtonProps {
  children: string;
  colorName: string;
  textColor:
    | 'text-primary'
    | 'text-secondary'
    | 'text-success'
    | 'text-danger'
    | 'text-white'
    | 'text-dark';
  type: 'button' | 'submit' | 'reset' | undefined;
}

const Button: FC<ButtonProps> = ({ children, colorName, type, textColor }) => {
  return (
    <button type={type} className={`btn btn-${colorName} ${textColor}`}>
      {children}
    </button>
  );
};

export default Button;
