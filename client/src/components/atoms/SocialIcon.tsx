import React, { FC, Fragment } from 'react';

interface SocialIconProps {
  value: any;
  socialNet: string;
  classIconName: string;
  styleIconColor: React.CSSProperties;
}

const SocialIcon: FC<SocialIconProps> = ({
  value,
  socialNet,
  classIconName,
  styleIconColor
}) => {
  return (
    <Fragment>
      {value ? (
        <a href={socialNet} target='_blank' rel='noreferrer noopener'>
          <i className={classIconName} style={styleIconColor} />
        </a>
      ) : null}
    </Fragment>
  );
};

export default SocialIcon;
