import React, { FC, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// コンポーネント
import { Spinner } from '../layout/index';
import { DashboardActions } from './index';
import { Experience } from './index';
import { Education } from './index';

// スライサー
import {
  getCurrentProfileAsync,
  profileStatus,
  deleteAccountAsync
} from '../../features/profile/profileSlice';
import { authStatus } from '../../features/auth/authSlice';

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector(profileStatus);
  const auth = useSelector(authStatus);
  useEffect(() => {
    dispatch(getCurrentProfileAsync({}));
  }, [dispatch]);
  return profile.loading && profile.profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='text-primary'>Dashboard</h1>
      <p>
        <i className='fa fa-user'></i> Welcome {auth.user && auth.user.name}
      </p>
      {profile.profile !== null ? (
        <Fragment>
          <DashboardActions />

          {profile.profile.experience!.length > 0 ||
          profile.profile.experience === undefined ? (
            <Experience />
          ) : null}
          {profile.profile.education!.length > 0 ||
          profile.profile.education === undefined ? (
            <Education />
          ) : null}

          <div className='my-2'>
            <button
              onClick={() => {
                if (window.confirm('本当にアカウントを削除しますか？')) {
                  dispatch(deleteAccountAsync({}));
                }
              }}
              className='btn btn-danger'>
              <i className='fas fa-user-minus'></i> アカウントの削除
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            あなたはプロフィールを追加していません。プロフィールを追加してください。
          </p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            プロフィール登録
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
