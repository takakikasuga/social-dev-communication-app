import React, { FC } from 'react';

// コンポーネント
import { SocialIcon } from '../atoms/index';

// スタイル
import { RoundImage, IconLists } from '../../styles/index';

const ProfileTop: FC<any> = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  console.log('social', social);
  return (
    <div style={{ backgroundColor: '#c7ecee' }} className='text-center py-5'>
      <RoundImage src={avatar} alt='アバター' />
      <h1>{name}</h1>
      <p>
        {status}
        {company ? <span> at {company}</span> : null}
      </p>
      <p>{location ? location : null}</p>
      <IconLists>
        <SocialIcon
          value={website}
          socialNet={website}
          classIconName='fas fa-globe fa-2x'
          styleIconColor={{ color: '#bdc3c7' }}
        />
        <SocialIcon
          value={social?.twitter}
          socialNet={social?.twitter}
          classIconName='fab fa-twitter fa-2x'
          styleIconColor={{ color: '#55acee' }}
        />
        <SocialIcon
          value={social?.facebook}
          socialNet={social.facebook}
          classIconName='fab fa-facebook fa-2x'
          styleIconColor={{ color: '#3B5998' }}
        />
        <SocialIcon
          value={social?.instagram}
          socialNet={social.instagram}
          classIconName='fab fa-instagram fa-2x'
          styleIconColor={{ color: '#CF2E92' }}
        />
        <SocialIcon
          value={social?.youtube}
          socialNet={social.youtube}
          classIconName='fab fa-youtube fa-2x'
          styleIconColor={{ color: '#DA1725' }}
        />
        <SocialIcon
          value={social?.linkedin}
          socialNet={social.linkedin}
          classIconName='fab fa-linkedin fa-2x'
          styleIconColor={{ color: '#0e76a8' }}
        />
      </IconLists>
    </div>
  );
};

export default ProfileTop;
