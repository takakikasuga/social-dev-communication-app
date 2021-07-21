import React, { FC, useEffect } from 'react';
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

const ProfileGithub: FC<ProfileGithubProps> = ({ username }) => {
  const dispatch = useDispatch();
  const profile = useSelector(profileStatus);
  useEffect(() => {
    dispatch(getGithubReposAsync(username));
  }, [dispatch, username]);
  return (
    <div>
      <h2 className='text-primary'>Githubリポジトリ</h2>
      {profile.repos.length > 0 ? (
        profile.repos.map((repo: any) => {
          return (
            <div key={repo.id} className='m-1 p-1'>
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'>
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
                  <li className='badge bg-success'>
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          );
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ProfileGithub;
