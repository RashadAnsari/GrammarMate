import React from 'react';
import { theme } from 'antd';

const { useToken } = theme;

function NavigationMenu() {
  const { token } = useToken();

  return (
    <div style={{
      marginTop: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: token.colorText,
    }}
    >
      <img src="logo192.png" alt="GrammarMate" width={100} />
      <h1 style={{ marginLeft: 20 }}>GrammarMate</h1>
    </div>
  );
}

export default NavigationMenu;
