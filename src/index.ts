import { GraphQLClient } from 'graphql-request';
import { ISSUE_API } from '@githubApi/index';
import { Config } from '@model/index';

const config: Config = {
  repositoryName: 'test-github-api',
  owner: 'seonhyungjo',
  token: '',
  repositoryId: '',
};

const getIssueList = async () => {
  const endpoint: string = 'https://api.github.com/graphql';
  const query: string = ISSUE_API.getIssueQuery(config);
  const graphQLClient: GraphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });
  const data = await graphQLClient.request(query);
  return data;
};

console.log(getIssueList());
