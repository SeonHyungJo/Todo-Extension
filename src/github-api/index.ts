import { Config } from '@src/model';

// import * as ISSUE_API from '@githubApi/issue';
// import * as LABEL_API from '@githubApi/label';
import * as REPO_API from '@githubApi/repo';
import { requestModule } from '@githubApi/request';

export const getRepoId = ({ token, owner, repositoryName }: Config) => {
  const body = REPO_API.getRepoId({ repositoryName, owner });

  return requestModule(body, token);
};
