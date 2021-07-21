import React, { FC, Fragment } from 'react';

const NotFound: FC = () => {
  return (
    <Fragment>
      <h1 className='text-primary'>
        <i className='fas fa-exclamation-triangle'></i> Page Not Found
      </h1>
      <p>このページは見つかりませんでした。</p>
    </Fragment>
  );
};

export default NotFound;
