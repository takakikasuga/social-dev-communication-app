import React, { FC, Fragment } from 'react';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

// スタイルコンポーネント
import { ErrorParagraph } from '../../styles/errorParagraph';

interface InputNameProps {
  register: UseFormRegisterReturn;
  error: FieldError;
}

const InputName: FC<InputNameProps> = ({ register, error }) => {
  return (
    <Fragment>
      <label htmlFor='name' className='form-label'>
        Name
      </label>
      <input
        autoComplete='on'
        {...register}
        type='text'
        placeholder='Name'
        className='form-control'
        id='name'
      />
      {error && <ErrorParagraph>{error.message}</ErrorParagraph>}
    </Fragment>
  );
};

export default InputName;
