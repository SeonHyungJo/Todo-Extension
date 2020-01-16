import { GraphQLClient } from 'graphql-request';
import { issueAPI } from '@githubApi/index';

const getIssueList = async () => {
  const endpoint: string = 'https://api.github.com/graphql';
  const query: string = issueAPI.getIssueQuery(
    'test-github-api',
    'seonhyungjo',
  );
  const graphQLClient: GraphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: 'Bearer b494f6d3c5322c79bbd712dc1d515aec9257710e',
    },
  });
  const data = await graphQLClient.request(query);
  return data;
};

console.log(getIssueList());
