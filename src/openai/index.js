import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';
import i18n from '../i18n';

const unknownError = new Error(i18n.t('Something went wrong! Please try again later.'));

export const lookForAPIKey = () => localStorage.getItem('api_key');

export const storeAPIKey = (apiKey) => {
  localStorage.setItem('api_key', apiKey);
};

export const removeAPIKey = () => {
  localStorage.removeItem('api_key');
};

const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data?.error;
    if (apiError) {
      if (apiError.code === 'invalid_api_key') {
        removeAPIKey();
      }

      return new Error(apiError.message);
    }
  }

  return unknownError;
};

export const correctGrammar = async (inputText, apiKey) => {
  const client = new OpenAIApi(new Configuration({ apiKey }));

  try {
    const maxTokens = inputText.trim().length + 96;
    const resp = await client.createCompletion({
      model: 'text-davinci-002',
      prompt: `Correct below sentences to standard English:\n${inputText}`,
      top_p: 1.0,
      temperature: 0,
      presence_penalty: 0.0,
      frequency_penalty: 0.0,
      max_tokens: maxTokens,
    });

    return resp.data.choices[0].text.trim();
  } catch (error) {
    throw handleError(error);
  }
};
