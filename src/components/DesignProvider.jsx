import React from 'react';
import { ConfigProvider, Layout } from 'antd';

const { Content } = Layout;

function DesignProvider({ children }) {
  const defaultTheme = {
    // https://ant.design/theme-editor
    token: {
      // fontFamily: "'Roboto', sans-serif",
      colorPrimary: '#0072c6',
      colorInfo: '#0072c6',
      colorBgBase: '#f8fcf7',
    },
  };

  return (
    <ConfigProvider theme={defaultTheme}>
      <Layout>
        <Content>
          {children}
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default DesignProvider;
