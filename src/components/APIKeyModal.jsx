import React, { useEffect, useRef } from 'react';
import { Modal, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

function APIKeyModal({ resolve, reject }) {
  const textInput = useRef();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (resolve || reject) {
      setTimeout(() => {
        textInput.current.focus();
      }, 500);
    }
  }, [resolve, reject]);

  if (!resolve || !reject) {
    return <Modal />;
  }

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const { apiKey } = values;
        resolve(apiKey);
      })
      .catch(() => {});
  };

  const handleClose = () => {
    textInput.current.blur();
    reject(new Error('Cancel'));
  };

  return (
    <Modal
      open
      title={t('OpenAI API Key')}
      okText={t('Submit')}
      okButtonProps={{ type: 'primary' }}
      onOk={handleSubmit}
      onCancel={handleClose}
    >
      <Form form={form}>
        <Form.Item
          style={{ marginTop: 20 }}
          name="apiKey"
          rules={[{
            required: true,
            message: t('Please input your API Key.'),
          }]}
        >
          <Input
            ref={textInput}
            placeholder={t('OpenAI API Key')}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default APIKeyModal;
