import React, { FC, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

// スライサー
import { authStatus } from '../../features/auth/authSlice';
import { deleteCommentAsync } from '../../features/post/postSlice';

// スタイル
import { RoundImage, CommentContainer } from '../../styles/index';

interface CommentItemProps {
  postId: string;
  comment: {
    _id: string;
    text: string;
    name: string;
    avatar: string;
    user: string;
    date: Date;
  };
}

const CommentItem: FC<CommentItemProps> = ({
  postId,
  comment: { _id, text, name, avatar, user, date }
}) => {
  const dispatch = useDispatch();
  const auth = useSelector(authStatus);
  return (
    <Fragment>
      <CommentContainer>
        <div>
          <Link to={`/profile/${user}`}>
            <RoundImage src={avatar} alt='アバター' />
          </Link>
          <h4>{name}</h4>
        </div>
        <div>
          <p>{text}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p>
            投稿日: <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
          {!auth.loading && user === auth.user?._id ? (
            <button
              type='button'
              className='btn btn-danger text-white'
              onClick={() => {
                dispatch(deleteCommentAsync({ postId, commentId: _id }));
              }}>
              <i className='fas fa-times'></i>
            </button>
          ) : null}
        </div>
      </CommentContainer>
    </Fragment>
  );
};

export default CommentItem;
