import React, { FC, Fragment } from 'react';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

// スタイルコンポーネント
import { ErrorParagraph } from '../../styles/errorParagraph';

interface InputPasswordProps {
  register: UseFormRegisterReturn;
  error: FieldError;
}

const InputPassword: FC<InputPasswordProps> = ({ register, error }) => {
  return (
    <Fragment>
      <label htmlFor='password' className='form-label'>
        Password
      </label>
      <input
        autoComplete='on'
        {...register}
        placeholder='Password'
        type='password'
        className='form-control'
        id='password'
      />
      {error && <ErrorParagraph>{error.message}</ErrorParagraph>}
    </Fragment>
  );
};

export default InputPassword;
