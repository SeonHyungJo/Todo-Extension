import { GraphQLClient } from 'graphql-request';
import { issueAPI } from '@githubApi/index';

const getIssueList = async () => {
  const endpoint: string = 'https://api.github.com/graphql';
  const query: string = issueAPI.getIssueQuery({
    repoName: 'test-github-api',
    owner: 'seonhyungjo',
  });
};

console.log(getIssueList());
