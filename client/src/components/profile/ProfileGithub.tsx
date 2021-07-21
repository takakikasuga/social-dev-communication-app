import React, { FC, Fragment, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../../components/layout';

// スライサー
import {
  profileStatus,
  getGithubReposAsync
} from '../../features/profile/profileSlice';

interface ProfileGithubProps {
  username: string;
}

const PER_PAGE = 5;
const LAST_DISPLAY_PAGES = 2;
const AROUND_DISPLAY_PAGES = 2;

const ProfileGithub: FC<ProfileGithubProps> = ({ username }) => {
  const dispatch = useDispatch();
  const profile = useSelector(profileStatus);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(profile.repos.length / PER_PAGE);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  useEffect(() => {
    dispatch(getGithubReposAsync(username));
  }, [dispatch, username]);

  const currentPageData = profile.repos
    .slice(offset, offset + PER_PAGE)
    .map((repo: any) => {
      return (
        <div key={repo.id} className='m-1 p-1'>
          <div>
            <h4>
              <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className='badge bg-secondary'>
                Stars: {repo.stargazers_count}
              </li>
              <li className='badge bg-primary'>
                Watchers: {repo.watchers_count}
              </li>
              <li className='badge bg-success'>Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      );
    });

  return (
    <div>
      <h2 className='text-primary'>Githubリポジトリ</h2>
      {profile.repos.length > 0 ? (
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
        <Spinner />
      )}
    </div>
  );
};

export default ProfileGithub;
