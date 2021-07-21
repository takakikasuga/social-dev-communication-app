import React, { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
// スタイル（読み込むことで適用される）
import '../../styles/css/pagination.css';

// コンポーネント
import { Spinner } from '../layout/index';
import { PostItem, PostForm } from '../posts/index';

// スライサー
import { getAllPostsAsync, postStatus } from '../../features/post/postSlice';

const PER_PAGE = 5;
const LAST_DISPLAY_PAGES = 1;
const AROUND_DISPLAY_PAGES = 2;

const Posts: FC = () => {
  const dispatch = useDispatch();
  const post = useSelector(postStatus);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(post.posts.length / PER_PAGE);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  useEffect(() => {
    dispatch(getAllPostsAsync({}));
  }, [dispatch]);

  const currentPageData = post.posts
    .slice(offset, offset + PER_PAGE)
    .map((post) => {
      return <PostItem key={post._id} post={post} />;
    });

  return post.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='text-primary'>投稿</h1>
      <p>
        <i className='fas fa-user' /> ようこそ 技術ナレッジコミュニティへ
      </p>
      <PostForm />
      <div>{currentPageData}</div>
      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        pageCount={pageCount}
        marginPagesDisplayed={LAST_DISPLAY_PAGES}
        pageRangeDisplayed={AROUND_DISPLAY_PAGES}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination__link'}
        nextLinkClassName={'pagination__link'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
      />
    </Fragment>
  );
};

export default Posts;
