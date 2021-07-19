import React, { FC } from 'react';
import { useSelector } from 'react-redux';

// スライサー
import { raiseAlertState } from '../../features/alert/alertSlice';

const Alert: FC = (): false | any => {
  const alerts = useSelector(raiseAlertState);
  console.log('alerts', alerts);
  return (
    alerts.length > 0 &&
    alerts.map((alert) => {
      return (
        <div
          key={alert.id}
          className={`alert alert-${alert.alertType} mt-3`}
          role='alert'>
          {alert.message}
        </div>
      );
    })
  );
};

export default Alert;
