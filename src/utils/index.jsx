import React from 'react';
import { message, Alert } from 'antd';
import i18n from '../i18n';

export const alertError = (description) => {
  message.open({
    duration: 5,
    content: <Alert
      showIcon
      closable
      type="error"
      message={i18n.t('Error')}
      description={description}
    />,
  });
};

export const alertInfo = (description) => {
  message.open({
    duration: 1,
    content: <Alert
      showIcon
      type="info"
      description={description}
    />,
  });
};
