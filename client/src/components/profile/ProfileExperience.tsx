import React, { FC } from 'react';
import Moment from 'react-moment';

interface ProfileExperienceProps {
  experience: {
    _id: string;
    title: string;
    company: string;
    from: string;
    to?: string;
    description: string;
    current?: boolean;
  };
}

const ProfileExperience: FC<ProfileExperienceProps> = ({
  experience: { company, title, from, to, description }
}) => {
  return (
    <div>
      <h3>{company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
        {!to ? '現在' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong>役割: </strong> {title}
      </p>
      <p>
        <strong>詳細: </strong> {description}
      </p>
    </div>
  );
};

export default ProfileExperience;
