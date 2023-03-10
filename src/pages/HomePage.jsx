import React, { useState } from 'react';
import {
  theme, Input, Button, Form,
} from 'antd';
import { useTranslation } from 'react-i18next';
import APIKeyModal from '../components/APIKeyModal';
import config from '../config';
import { alertError } from '../utils';
import { lookForAPIKey, storeAPIKey, correctGrammar } from '../openai';

const { TextArea } = Input;
const { useToken } = theme;

function HomePage() {
  const { token } = useToken();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const formItemMargin = 35;
  const textAreaFontSize = token.fontSize + 2;

  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [apiKeyModalProps, setApiKeyModalProps] = useState({});

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const { inputText } = values;

        let apiKey = lookForAPIKey();
        if (!apiKey) {
          try {
            apiKey = await new Promise((resolve, reject) => {
              setApiKeyModalProps({ resolve, reject });
            });
            storeAPIKey(apiKey);
          } catch (error) {
            return;
          } finally {
            setApiKeyModalProps({});
          }
        }

        setLoading(true);
        correctGrammar(inputText, apiKey)
          .then((correctInput) => {
            setResult(correctInput);
            setLoading(false);
          })
          .catch((error) => {
            alertError(error.message);
            setLoading(false);
          });
      })
      .catch(() => {});
  };

  return (
    <div style={{ margin: config.pageMargin }}>
      <div style={{
        margin: 'auto',
        maxWidth: '80%',
        textAlign: 'center',
      }}
      >
        <Form form={form}>
          <Form.Item
            name="inputText"
            style={{ marginBottom: formItemMargin, textAlign: 'left' }}
            rules={[{ required: true, message: t('Please input your text.') }]}
          >
            <TextArea
              rows={5}
              style={{ fontSize: textAreaFontSize }}
              placeholder={t('Please input your text here...')}
              // onKeyDown={(event) => {
              //   if (event.key === 'Enter') {
              //     handleSubmit();
              //   }
              // }}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: formItemMargin }}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={handleSubmit}
            >
              {t('Correct me')}
            </Button>
          </Form.Item>
        </Form>
        <TextArea
          rows={5}
          readOnly
          value={result}
          style={{ fontSize: textAreaFontSize }}
          placeholder={t('The result will show up here...')}
        />
      </div>
      <APIKeyModal {...apiKeyModalProps} />
    </div>
  );
}

export default HomePage;
