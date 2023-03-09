import React from 'react';
import { ConfigProvider, Layout } from 'antd';

const { Content } = Layout;

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
      <Layout>
        <Content>
          {children}
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default DesignProvider;
