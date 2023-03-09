import React from 'react';
import { theme } from 'antd';
import config from '../config';

const { useToken } = theme;

function HomePage() {
  const { token } = useToken();

  return (
    <div style={{
      textAlign: 'left',
      margin: config.pageMargin,
      fontSize: token.fontSize,
      color: token.colorTextSecondary,
    }}
    />
  );
}

export default HomePage;
