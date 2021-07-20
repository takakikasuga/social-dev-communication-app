import React, { FC, Fragment } from 'react';
import { ProfileData } from '../../features/profile/profileSlice';
interface ProfileAboutProps {
  profile: ProfileData;
}
const ProfileAbout: FC<ProfileAboutProps> = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  return (
    <div>
      {bio ? (
        <Fragment>
          <h2>{name.split(' ')[0]}の経歴</h2>
          <p>{bio}</p>
        </Fragment>
      ) : null}
      <div>
        {skills.map((skill, index) => {
          return (
            <div className='p-1' key={index}>
              <i className='fas fa-check' /> {skill}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileAbout;
