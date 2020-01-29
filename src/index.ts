import { Config } from '@model/index';
import { getRepoId } from '@githubApi/index';

const token = process.env.TOKEN || '';

const config: Config = {
  repositoryName: 'test-github-api',
  owner: 'seonhyungjo',
  token: token,
  repositoryId: '',
};

const requestData = getRepoId(config);

fetch(requestData.url, {
  body: JSON.stringify({ query: requestData.body }),
  method: requestData.method,
  headers: requestData.headers,
}).then(response => console.log(response.body));
