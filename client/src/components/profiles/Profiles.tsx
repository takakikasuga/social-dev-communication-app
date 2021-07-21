import React, { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

// スタイル（読み込むことで適用される）
import '../../styles/css/pagination.css';

// コンポーネント
import { Spinner } from '../layout/index';
import { ProfileItem } from './index';

// スライサー
import {
  getAllProfilesAsync,
  profileStatus
} from '../../features/profile/profileSlice';

const PER_PAGE = 10;
const LAST_DISPLAY_PAGES = 2;
const AROUND_DISPLAY_PAGES = 2;

const Profiles: FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector(profileStatus);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(profile.profiles.length / PER_PAGE);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  useEffect(() => {
    dispatch(getAllProfilesAsync({}));
  }, [dispatch]);

  const currentPageData = profile.profiles
    .slice(offset, offset + PER_PAGE)
    .map((profile) => {
      return <ProfileItem profile={profile} key={profile._id} />;
    });

  return (
    <Fragment>
      {profile.loading || profile.profiles.length === 0 ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='text-primary'>開発者</h1>
          <p>
            <i className='fab fa-connectdevelop'></i> 開発者一覧
          </p>
          <div>
            {profile.profiles.length > 0 ? (
              <Fragment>
                {currentPageData}
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
            ) : (
              <h4>プロフィールを登録しているユーザーがいません。。</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;
