import React, { FC, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

// コンポーネント
import { Spinner } from '../layout/index';
import { ProfileTop } from './index';
import { ProfileAbout } from './index';
import { ProfileExperience } from './index';
import { ProfileEducation } from './index';

// スライサー
import {
  getProfileByIdAsync,
  profileStatus
} from '../../features/profile/profileSlice';
import { authStatus } from '../../features/auth/authSlice';

const Profile: FC = () => {
  const { profile_id } = useParams<{ profile_id?: string }>();
  const dispatch = useDispatch();
  const auth = useSelector(authStatus);
  const profile = useSelector(profileStatus);

  console.log(' profile_id ', profile_id);
  useEffect(() => {
    if (profile_id) {
      dispatch(getProfileByIdAsync(profile_id));
    }
  }, [dispatch, profile_id]);
  return (
    <Fragment>
      {profile.profile === null || profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-primary p-2'>
            プロフィール一覧へ
          </Link>
          {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user?._id === profile.profile.user._id ? (
            <Link to='/edit-profile' className='btn btn-light p-2'>
              プロフィール編集へ
            </Link>
          ) : null}
          <div>
            <ProfileTop profile={profile.profile} />
            <ProfileAbout profile={profile.profile} />
            <div>
              <h2>経歴</h2>
              {profile.profile.experience!.length > 0 ? (
                <Fragment>
                  {profile.profile.experience!.map((experience, index) => {
                    return (
                      <ProfileExperience
                        experience={experience}
                        key={experience._id}
                      />
                    );
                  })}
                </Fragment>
              ) : (
                <h4>経験が追加されていません。</h4>
              )}
            </div>
            <div>
              <h2>学歴</h2>
              {profile.profile.education!.length > 0 ? (
                <Fragment>
                  {profile.profile.education!.map((education, index) => {
                    return (
                      <ProfileEducation
                        education={education}
                        key={education._id}
                      />
                    );
                  })}
                </Fragment>
              ) : (
                <h4>教育、学歴が追加されていません。</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
