import React, { useState } from 'react';
import {
  theme, Input, Button, Form,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { DiffChars } from 'react-diff-components';
import APIKeyModal from '../components/APIKeyModal';
import { alertError } from '../utils';
import { lookForAPIKey, storeAPIKey, correctGrammar } from '../openai';

const { TextArea } = Input;
const { useToken } = theme;

function HomePage() {
  const { token } = useToken();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const formItemMargin = 35;
  const textAreaStyles = {
    fontSize: 20,
    resize: 'none',
    lineHeight: 1.75,
    color: token.colorTextSecondary,
  };

  const [value, setValue] = useState();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [apiKeyModalProps, setApiKeyModalProps] = useState({});

  const handleClear = () => {
    setValue();
    setResult();
  };

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
            setValue(inputText);
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
    <div style={{
      margin: 'auto',
      maxWidth: '90%',
      textAlign: 'center',
    }}
    >
      <div style={{
        margin: 'auto',
        maxWidth: '90%',
        textAlign: 'center',
        marginBottom: 40,
        color: token.colorTextSecondary,
      }}
      >
        <h3>
          {t('Welcome to GrammarMate, your ultimate grammar companion! With the power of ChatGPT, you can now instantly correct any grammatical errors in your writing. Simply type in a sentence and get suggestions for improvement. Say goodbye to grammar errors and hello to confident writing with GrammarMate!')}
        </h3>
      </div>
      <Form form={form}>
        <Form.Item
          name="inputText"
          validateTrigger={false}
          style={{ marginBottom: formItemMargin, textAlign: 'left' }}
          rules={[{ required: true, message: t('Please input your text.') }]}
        >
          <TextArea
            rows={7}
            showCount
            allowClear
            autoFocus
            maxLength={4000}
            style={textAreaStyles}
            className="main-input"
            onChange={(event) => { if (!event.target.value) { handleClear(); } }}
            placeholder={t('Please input your text here...')}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: formItemMargin }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{
              border: 0,
              fontSize: 20,
              width: 'auto',
              height: 'auto',
              boxShadow: 'none',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
            onClick={handleSubmit}
          >
            {t('Correct me')}
          </Button>
        </Form.Item>
      </Form>
      {value && result
        ? (
          <div style={{
            marginLeft: 12,
            marginRight: 12,
            marginBottom: 20,
            textAlign: 'left',
          }}
          >
            <DiffChars from={value} to={result} />
          </div>
        )
        : null}
      <TextArea
        rows={7}
        readOnly
        value={result}
        style={textAreaStyles}
        placeholder={t('The result will show up here...')}
      />
      <APIKeyModal {...apiKeyModalProps} />
    </div>
  );
}

export default HomePage;
