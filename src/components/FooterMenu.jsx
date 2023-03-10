import React from 'react';
import { useTranslation } from 'react-i18next';
import { theme } from 'antd';

const { useToken } = theme;

function FooterMenu() {
  const { token } = useToken();
  const { t } = useTranslation();

  return (
    <div style={{
      margin: '50px 0px',
      textAlign: 'center',
      color: token.colorTextTertiary,
    }}
    >
      {t('Copyright © 2023 GrammarMate all rights reserved.')}
    </div>
  );
}

export default FooterMenu;
