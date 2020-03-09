import { GraphQLClient } from 'graphql-request';
import { ISSUE_API } from '@/githubApi/index';
import { Config } from '@/model/index';
import configureStore from '@/redux';
import { addTodo } from '@/redux/todo';

const store = configureStore();

function btnClickHandle() {
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
}

/* Create Button for TEST */
const rootElement = document.getElementById('app');
const sampleTemplate = `<button id="test">Click me</button><div id="itemList"></div>`;

rootElement.innerHTML = sampleTemplate;
const btnElement = document.getElementById('test');
const itemListElement = document.getElementById('itemList');
btnElement?.addEventListener('click', btnClickHandle);

const config: Config = {
  repositoryName: 'test-github-api',
  owner: 'seonhyungjo',
  token: '',
  repositoryId: '',
};

const getIssueList = () => {
  return new Promise(resolve => {
    const endpoint: string = process.env.END_POINT || '';
    const query: string = ISSUE_API.getIssueQuery(config);
    const graphQLClient: GraphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });
    const data = graphQLClient.request(query);
    resolve(data);
  });
};

function handleChange() {
  const {
    todo: { todo },
  } = store.getState();
  console.log('todo', todo);
  const newElemnet = todo.map(({ title, body }) => {
    return `<div><h1>${title}</h1><p>${body}</p></div>`;
  });

  itemListElement?.innerHTML = newElemnet.join('');
}

const unsubscribe = store.subscribe(handleChange);
