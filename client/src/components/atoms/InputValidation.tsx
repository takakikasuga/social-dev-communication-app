import React, { FC, Fragment } from 'react';

// スタイルコンポーネント
import { ErrorParagraph } from '../../styles/errorParagraph';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputValidateProps {
  register: UseFormRegisterReturn;
  error: FieldError;
  inputType: string;
  placeholder: string;
  id: string;
  children: string;
  classIconName?: string;
  styleIconColor?: React.CSSProperties;
}

const InputValidation: FC<InputValidateProps> = ({
  register,
  error,
  inputType,
  placeholder,
  id,
  children,
  classIconName,
  styleIconColor
}) => {
  console.log('classIconName', classIconName);
  return (
    <Fragment>
      {classIconName ? null : (
        <label htmlFor={id} className='form-label'>
          {children}
        </label>
      )}
      {classIconName && (
        <i className={classIconName} style={styleIconColor}></i>
      )}
      <input
        autoComplete='on'
        {...register}
        type={inputType}
        placeholder={placeholder}
        className='form-control'
        id={id}
      />
      {error && <ErrorParagraph>{error.message}</ErrorParagraph>}
    </Fragment>
  );
};

export default InputValidation;
