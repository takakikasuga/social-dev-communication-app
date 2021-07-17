import React, { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';

// コンポーネント
import { Button } from '../atoms/index';

// スタイルコンポーネント
import { Title, SubText } from '../../styles/title';
import { BackgroundDiv, Box } from '../../styles/landing';

const Landing: FC = () => {
  return (
    <Fragment>
      <BackgroundDiv>
        <Box>
          <Title className='img-fluid'>Social Dev Communication</Title>
          <SubText>
            開発者のためのソーシャルネットワークコミュニケーションプラットフォームです。知見のシェアと繋がりを創って発者同士盛り上げていきましょう。
          </SubText>
          <Link to='/register'>
            <Button colorName='info' type='button' textColor='text-white'>
              新規登録
            </Button>
          </Link>
          <Link to='/login'>
            <Button type='button' colorName='light' textColor='text-dark'>
              ログイン
            </Button>
          </Link>
        </Box>
      </BackgroundDiv>
    </Fragment>
  );
};

export default Landing;
