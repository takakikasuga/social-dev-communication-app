import React, { FC, Fragment } from 'react';

// スタイルコンポーネント
import { ErrorParagraph } from '../../styles/errorParagraph';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface TextareaValidationProps {
  register: UseFormRegisterReturn;
  error: FieldError;
  placeholder: string;
  id: string;
  children: string;
  classIconName?: string;
  styleIconColor?: React.CSSProperties;
  disabled?: boolean;
}

const TextareaValidation: FC<TextareaValidationProps> = ({
  register,
  error,
  placeholder,
  id,
  children,
  classIconName,
  styleIconColor,
  disabled = false
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
      <textarea
        disabled={disabled}
        autoComplete='on'
        {...register}
        placeholder={placeholder}
        className='form-control'
        id={id}
      />
      {error && <ErrorParagraph>{error.message}</ErrorParagraph>}
    </Fragment>
  );
};

export default TextareaValidation;
