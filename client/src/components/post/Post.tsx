import React, { FC, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

// スライサー
import { getPostAsync, postStatus } from '../../features/post/postSlice';

// コンポーネント
import { Spinner } from '../layout/index';
import { PostItem } from '../posts/index';
import { CommentForm, CommentItem } from './index';

const Post: FC = () => {
  const dispatch = useDispatch();
  const { post_id } = useParams<{ post_id: string | undefined }>();
  const post = useSelector(postStatus);
  console.log('post_id', post_id);
  useEffect(() => {
    dispatch(getPostAsync(post_id!));
  }, [dispatch, post_id]);
  return post.loading || post.post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn btn-primary my-5'>
        投稿一覧へ
      </Link>
      <PostItem post={post.post} showActions={false} />
      <CommentForm postId={post.post._id} />
      <div>
        {post.post && post.post.comments.length > 0
          ? (
              post.post.comments as {
                _id: string;
                user: string;
                text: string;
                name: string;
                avatar: string;
                date: Date;
              }[]
            ).map((comment) => {
              return (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  postId={post.post!._id}
                />
              );
            })
          : null}
      </div>
    </Fragment>
  );
};

export default Post;
