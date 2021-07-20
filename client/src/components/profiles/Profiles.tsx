import React, { FC, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// コンポーネント
import { Spinner } from '../layout/index';
import { ProfileItem } from './index';

// スライサー
import {
  getAllProfilesAsync,
  profileStatus
} from '../../features/profile/profileSlice';

const Profiles: FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector(profileStatus);
  useEffect(() => {
    dispatch(getAllProfilesAsync({}));
  }, [dispatch]);
  return (
    <Fragment>
      {profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='text-primary'>開発者</h1>
          <p>
            <i className='fab fa-connectdevelop'></i> 開発者一覧
          </p>
          <div>
            {profile.profiles.length > 0 ? (
              <Fragment>
                {profile.profiles.map((profile) => {
                  return (
                    <ProfileItem
                      profile={profile}
                      key={profile._id}></ProfileItem>
                  );
                })}
              </Fragment>
            ) : (
              <h4>プロフィールを登録しているユーザーがいません。。</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;
