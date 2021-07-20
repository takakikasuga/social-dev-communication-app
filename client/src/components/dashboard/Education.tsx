import React, { FC, Fragment } from 'react';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';

// コンポーネント
import { TableData } from '../../styles/tableDate';

// スライサー
import {
  profileStatus,
  deleteEducationAsync
} from '../../features/profile/profileSlice';

const Education: FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector(profileStatus);

  const TableDataEdu = profile.profile?.education?.map((edu, index: number) => {
    return (
      <tr key={edu._id}>
        <th style={{ verticalAlign: 'middle' }} scope='row'>
          {index + 1}
        </th>
        <TableData>{edu.school}</TableData>
        <TableData> {edu.degree}</TableData>
        <TableData>
          <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
          {edu.to ? <Moment format='YYYY/MM/DD'>{edu.to}</Moment> : '現在'}
        </TableData>
        <TableData>
          <button
            className='text-white btn btn-danger'
            type='button'
            onClick={() => {
              dispatch(deleteEducationAsync(edu._id));
            }}>
            削除
          </button>
        </TableData>
      </tr>
    );
  });
  return (
    <Fragment>
      <h2 className='mt-5 mb3'>学歴情報</h2>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th scope='col'>Number</th>
            <th scope='col'>School</th>
            <th scope='col'>Degree</th>
            <th scope='col'>Years</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>{TableDataEdu}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
