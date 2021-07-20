import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import {
  RoundImage,
  DeveloperLists,
  ImageTextLayout,
  SkillLists
} from '../../styles/index';

const ProfileItem: FC<any> = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <DeveloperLists className='p-5 mb-3'>
      <ImageTextLayout>
        <RoundImage src={avatar} alt='アバター' />
        <div>
          <h2 className='fs-2'>{name}</h2>
          <p className='fs-4'>
            {status} {company && <span> at {company}</span>}
          </p>
          <p className='my-3 fs-5'>{location && <span>{location}</span>}</p>
          <Link className='btn btn-primary p-2' to={`/profile/${_id}`}>
            プロフィールを閲覧する
          </Link>
        </div>
      </ImageTextLayout>
      <SkillLists>
        {skills.slice(0, 4).map((skill: string, index: number) => {
          return (
            <li key={index}>
              <i className='fas fa-check'></i>{' '}
              <span className='text-primary'>{skill}</span>
            </li>
          );
        })}
      </SkillLists>
    </DeveloperLists>
  );
};

export default ProfileItem;
