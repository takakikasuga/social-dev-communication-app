import React, { FC, Fragment } from 'react';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

// スタイルコンポーネント
import { ErrorParagraph } from '../../styles/errorParagraph';

interface InputConfirmPasswordProps {
  register: UseFormRegisterReturn;
  error: FieldError;
}

const InputConfirmPassword: FC<InputConfirmPasswordProps> = ({
  register,
  error
}) => {
  return (
    <Fragment>
      <label htmlFor='confirmPassword' className='form-label'>
        Confirm Password
      </label>
      <input
        autoComplete='on'
        placeholder='ConfirmPassword'
        {...register}
        type='password'
        className='form-control'
        id='confirmPassword'
      />

      {error && <ErrorParagraph>{error.message}</ErrorParagraph>}
    </Fragment>
  );
};

export default InputConfirmPassword;
