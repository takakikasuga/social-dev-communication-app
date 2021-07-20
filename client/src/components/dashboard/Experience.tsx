import React, { FC, Fragment } from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';

// コンポーネント
import { Button } from '../atoms/index';
import { TableData } from '../../styles/tableDate';

// スライサー
import { profileStatus } from '../../features/profile/profileSlice';

const Experience: FC = () => {
  const profile = useSelector(profileStatus);

  const TableDataExp = profile.profile?.experience?.map(
    (exp, index: number) => {
      return (
        <tr key={exp._id}>
          <th style={{ verticalAlign: 'middle' }} scope='row'>
            {index + 1}
          </th>
          <TableData>{exp.company}</TableData>
          <TableData> {exp.title}</TableData>
          <TableData>
            <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
            {exp.to ? <Moment format='YYYY/MM/DD'>{exp.to}</Moment> : '現在'}
          </TableData>
          <TableData>
            <Button textColor='text-white' buttonColor='danger' type='button'>
              削除
            </Button>
          </TableData>
        </tr>
      );
    }
  );
  return (
    <Fragment>
      <h2 className='mt-5 mb3'>経験/経歴情報</h2>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th scope='col'>Number</th>
            <th scope='col'>Company</th>
            <th scope='col'>Title</th>
            <th scope='col'>Years</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>{TableDataExp}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
