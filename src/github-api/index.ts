import { Config } from '@src/model';
//todo export
import * as ISSUE_API from '@githubApi/issue';
import * as LABEL_API from '@githubApi/label';
import * as REPO_API from '@githubApi/repo';
// import { requestObj } from '@githubApi/request';

export const getRepoId = (url: string, { repositoryName, owner }: Config) => {
  // return requestObj({
  //   url,
  //   data: {
  //     repositoryName,
  //     owner,
  //   },
  // });
};

export { ISSUE_API, LABEL_API, REPO_API };
