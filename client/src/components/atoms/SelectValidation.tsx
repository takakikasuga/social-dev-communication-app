import React, { FC, Fragment } from 'react';

import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

// スタイルコンポーネント
import { ErrorParagraph } from '../../styles/errorParagraph';

interface SelectValidationProps {
  selects: string[];
  register: UseFormRegisterReturn;
  error: FieldError;
}

const SelectValidation: FC<SelectValidationProps> = ({
  selects,
  register,
  error
}) => {
  const default_value = 1;
  console.log(selects);
  return (
    <Fragment>
      <select
        defaultValue={default_value}
        className='form-select '
        {...register}>
        <option value='default'>職業を選択してください。</option>
        {selects.map((select, index) => {
          return (
            <option key={index} value={select}>
              {select}
            </option>
          );
        })}
      </select>
      {error && <ErrorParagraph>{error.message}</ErrorParagraph>}
    </Fragment>
  );
};

export default SelectValidation;
