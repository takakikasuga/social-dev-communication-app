import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

// スライサー
import { authStatus } from '../../features/auth/authSlice';
import {
  addLikeAsync,
  removeLikeAsync,
  deletePostAsync
} from '../../features/post/postSlice';

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
  const dispatch = useDispatch();
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
        <button
          onClick={() => {
            dispatch(addLikeAsync(_id));
          }}
          type='button'
          className='btn btn-primary text-white'>
          <i className='fas fa-thumbs-up'></i>
          <span> {likes.length}</span>
        </button>
        <button
          onClick={() => {
            dispatch(removeLikeAsync(_id));
          }}
          type='button'
          className='btn btn-primary text-white'>
          <i className='fas fa-thumbs-down'></i>
        </button>

        <Link to={`/post/${_id}`} target='_blank' rel='noopener noreferrer'>
          会話 <span>{comments.length}</span>
        </Link>
        {!auth.loading && user === auth.user?._id ? (
          <button
            onClick={() => {
              dispatch(deletePostAsync(_id));
            }}
            type='button'
            className='btn btn-danger text-white'>
            <i className='fas fa-times'></i>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default PostItem;
