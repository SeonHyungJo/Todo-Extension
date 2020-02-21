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
import configureStore from './redux';
import { userLogin } from './redux/auth';
import { addTodo, updateTodo, delTodo } from './redux/todo';

const store = configureStore();
store.dispatch(
  addTodo({
    title: 'todo_add 추가',
    body: 'todo add 기능 추가하기',
    id: '123',
    modified: false,
    labelList: [
      {
        id: 'sdfsdfsdf',
        title: '개인',
        color: 'red',
      },
    ],
  }),
);

store.dispatch(
  updateTodo({
    title: 'todo_add 업데이트',
    body: 'todo add 기능 업데이트',
    id: '123',
    modified: false,
    labelList: [],
  }),
);

store.dispatch(
  delTodo({
    id: '123',
  }),
);
