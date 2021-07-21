import React, { FC } from 'react';
import Moment from 'react-moment';

interface ProfileEducationProps {
  education: {
    _id: string;
    school: string;
    degree: string;
    fieldofstudy: string;
    from: string;
    to?: string;
    description: string;
    current?: boolean;
  };
}

const ProfileEducation: FC<ProfileEducationProps> = ({
  education: { school, degree, fieldofstudy, from, to, description }
}) => {
  return (
    <div>
      <h3>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
        {!to ? '現在' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong>学位: </strong> {degree}
      </p>
      <p>
        <strong>専攻科目: </strong> {fieldofstudy}
      </p>
      <p>
        <strong>詳細: </strong> {description}
      </p>
    </div>
  );
};

export default ProfileEducation;
