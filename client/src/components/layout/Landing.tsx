import React, { FC, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

// スライサー
import { authStatus } from '../../features/auth/authSlice';

// コンポーネント
import { Button } from '../atoms/index';

// スタイルコンポーネント
import { Title, SubText } from '../../styles/title';
import { BackgroundDiv, Box } from '../../styles/landing';

const Landing: FC = () => {
  const auth = useSelector(authStatus);

  if (auth.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <BackgroundDiv>
        <Box>
          <Title className='img-fluid'>Social Dev Communication</Title>
          <SubText>
            開発者のためのソーシャルネットワークコミュニケーションプラットフォームです。知見のシェアと繋がりを創って発者同士盛り上げていきましょう。
          </SubText>
          <Link to='/register'>
            <Button buttonColor='info' type='button' textColor='text-white'>
              新規登録
            </Button>
          </Link>
          <Link to='/login'>
            <Button type='button' buttonColor='light' textColor='text-dark'>
              ログイン
            </Button>
          </Link>
        </Box>
      </BackgroundDiv>
    </Fragment>
  );
};

export default Landing;
