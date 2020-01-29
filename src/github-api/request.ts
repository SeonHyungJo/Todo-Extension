import { Config } from '@src/model';

// import * as ISSUE_API from '@githubApi/issue';
// import * as LABEL_API from '@githubApi/label';
import * as REPO_API from '@githubApi/repo';

const GITHUB_URL = process.env.GITHUB_URL;
const TOKEN = process.env.TOKEN;

export const getRepoId = (config: Config) => {
  return {
    url: GITHUB_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.token || TOKEN}`,
    },
    body: REPO_API.getRepoId(config),
  };
};
