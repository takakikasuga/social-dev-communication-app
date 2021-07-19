import React, { FC, Fragment } from 'react';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

// スタイルコンポーネント
import { ErrorParagraph } from '../../styles/errorParagraph';

interface InputEmailProps {
  register: UseFormRegisterReturn;
  error: FieldError;
}

const InputEmail: FC<InputEmailProps> = ({ register, error }) => {
  return (
    <Fragment>
      <label htmlFor='email' className='form-label'>
        Email address
      </label>
      <input
        autoComplete='on'
        {...register}
        placeholder='Email'
        type='email'
        className='form-control'
        id='email'
        aria-describedby='emailHelp'
      />
      {error && <ErrorParagraph>{error.message}</ErrorParagraph>}
      <div id='emailHelp' className='form-text'>
        We'll never share your email with anyone else.
      </div>
    </Fragment>
  );
};

export default InputEmail;
