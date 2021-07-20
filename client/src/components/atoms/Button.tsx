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
  toggleFunc?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleValue?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  buttonColor,
  type,
  textColor,
  toggleFunc,
  toggleValue
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${buttonColor} ${textColor}`}
      onClick={
        toggleFunc
          ? () => {
              toggleFunc(!toggleValue!);
            }
          : () => {}
      }>
      {children}
    </button>
  );
};

export default Button;
