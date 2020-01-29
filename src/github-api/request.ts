import { getState } from '@util/localStorage';

const GITHUB_URL = process.env.GITHUB_URL || 'https://api.github.com/graphql';
const CONFIG_KEY = 'todo_config';

export const requestModule = (body: string, token?: string) => {
  const defaultToken = getState(CONFIG_KEY);

  return {
    url: GITHUB_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || defaultToken}`,
    },
    body,
  };
};
