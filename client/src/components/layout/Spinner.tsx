import React, { FC, Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner: FC = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{
          width: '200px',
          margin: 'auto',
          marginTop: '40px',
          display: 'block'
        }}
        alt='loading...'
      />
    </Fragment>
  );
};

export default Spinner;
