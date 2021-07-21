import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

// コンポーネント
import { Button } from '../../components/atoms/index';

// スライサー
import { authStatus } from '../../features/auth/authSlice';

// スタイル
import { RoundImage } from '../../styles/index';

// 型
import { GetPostState } from '../../features/post/postSlice';

interface PostItemeProps {
  post: GetPostState;
}

const PostItem: FC<PostItemeProps> = ({
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => {
  const auth = useSelector(authStatus);
  return (
    <div>
      <div>
        <Link to='' target='_blank' rel='noopener noreferrer'>
          <RoundImage src={avatar} alt='avatar' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p>{text}</p>
        <p>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <Button type='button' buttonColor='primary' textColor='text-white'>
          <i className='fas fa-thumbs-up'></i>
          <span> {likes.length}</span>
        </Button>
        <Button type='button' buttonColor='primary' textColor='text-white'>
          <i className='fas fa-thumbs-down'></i>
        </Button>

        <Link to={`/post/${_id}`} target='_blank' rel='noopener noreferrer'>
          会話 <span>{comments.length}</span>
        </Link>
        {!auth.loading && user === auth.user?._id ? null : (
          <Button type='button' buttonColor='danger' textColor='text-white'>
            <i className='fas fa-times'></i>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
