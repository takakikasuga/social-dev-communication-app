import React, { FC, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// コンポーネント
import { Spinner } from '../layout/index';
import { PostItem, PostForm } from '../posts/index';

// スライサー
import { getAllPostsAsync, postStatus } from '../../features/post/postSlice';

const Posts: FC = () => {
  const dispatch = useDispatch();
  const post = useSelector(postStatus);
  useEffect(() => {
    dispatch(getAllPostsAsync({}));
  }, [dispatch]);

  return post.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='text-primary'>投稿</h1>
      <p>
        <i className='fas fa-user' /> ようこそ 技術ナレッジコミュニティへ
      </p>
      <PostForm />
      <div>
        {post.posts.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })}
      </div>
    </Fragment>
  );
};

export default Posts;
