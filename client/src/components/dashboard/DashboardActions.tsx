import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const DashboardActions: FC = () => {
  return (
    <div className='btn-group' role='group'>
      <Link to='/edit-profile' className='btn btn-primary text-center me-3'>
        <i className='fas fa-user-circle'></i> プロフィール編集
      </Link>
      <Link to='/add-experience' className='btn btn-primary me-3'>
        <i className='fab fa-black-tie'></i> 経験の追加
      </Link>
      <Link to='/add-education' className='btn btn-primary me-3'>
        <i className='fas fa-graduation-cap'></i> 学歴の追加
      </Link>
    </div>
  );
};

export default DashboardActions;
