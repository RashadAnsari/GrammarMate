import React from 'react';
import { ConfigProvider, Row, Col } from 'antd';

function DesignProvider({ children }) {
  const defaultTheme = {
    // https://ant.design/theme-editor
    token: {
      // fontFamily: "'Roboto', sans-serif",
      colorPrimary: '#0072c6',
      colorSplit: '#d9d9d9',
      colorInfo: '#0072c6',
    },
  };

  return (
    <ConfigProvider theme={defaultTheme}>
      <Row align="middle">
        <Col offset={1} span={22}>
          {children}
        </Col>
      </Row>
    </ConfigProvider>
  );
}

export default DesignProvider;
