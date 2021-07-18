import React, { FC } from 'react';

interface ButtonProps {
  children: string;
  buttonColor: string;
  textColor:
    | 'text-primary'
    | 'text-secondary'
    | 'text-success'
    | 'text-danger'
    | 'text-white'
    | 'text-dark';
  type: 'button' | 'submit' | 'reset' | undefined;
}

const Button: FC<ButtonProps> = ({
  children,
  buttonColor,
  type,
  textColor
}) => {
  return (
    <button type={type} className={`btn btn-${buttonColor} ${textColor}`}>
      {children}
    </button>
  );
};

export default Button;
