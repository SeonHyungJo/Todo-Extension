import {
  todoReducer,
  ITodoState,
  successRequestTodo,
  addTodo,
} from '@/redux/todo';
import { Github_Edges, Github_Issue, Todo } from '@/model';

const newIssue: Github_Edges<Github_Issue> = {
  edges: [
    {
      node: {
        id: 'MDU6SXNzdWU1NTA3NDM3NDQ=',
        title: 'test2',
        bodyHTML: '<p>test2</p>',
        labels: { edges: [] },
      },
    },
    {
      node: {
        id: 'MDU6SXNzdWU1NTExMjkzNTQ=',
        title: 'test',
        bodyHTML: '',
        labels: {
          edges: [
            {
              node: {
                id: 'MDU6TGFiZWwxNzkxMDk1NzIy',
                name: 'bug',
                color: 'd73a4a',
              },
            },
            {
              node: {
                id: 'MDU6TGFiZWwxNzkxMDk1NzIz',
                name: 'documentation',
                color: '0075ca',
              },
            },
            {
              node: {
                id: 'MDU6TGFiZWwxNzkxMDk1NzI0',
                name: 'duplicate',
                color: 'cfd3d7',
              },
            },
            {
              node: {
                id: 'MDU6TGFiZWwxNzkxMDk1NzI1',
                name: 'enhancement',
                color: 'a2eeef',
              },
            },
          ],
        },
      },
    },
  ],
};

test('Get Todo Items Testing', () => {
  // given
  const prevState = {
    todoItems: [],
    label: [],
  };

  // when
  const resultValue = todoReducer(prevState, successRequestTodo(newIssue));

  // done
  const expectValue: ITodoState = {
    todoItems: [
      {
        title: 'test2',
        body: '<p>test2</p>',
        id: 'MDU6SXNzdWU1NTA3NDM3NDQ=',
        modified: false,
        labelList: [],
      },
      {
        title: 'test',
        body: '',
        id: 'MDU6SXNzdWU1NTExMjkzNTQ=',
        modified: false,
        labelList: [
          { id: 'MDU6TGFiZWwxNzkxMDk1NzIy', name: 'bug', color: 'd73a4a' },
          {
            id: 'MDU6TGFiZWwxNzkxMDk1NzIz',
            name: 'documentation',
            color: '0075ca',
          },
          {
            id: 'MDU6TGFiZWwxNzkxMDk1NzI0',
            name: 'duplicate',
            color: 'cfd3d7',
          },
          {
            id: 'MDU6TGFiZWwxNzkxMDk1NzI1',
            name: 'enhancement',
            color: 'a2eeef',
          },
        ],
      },
    ],
    label: [],
  };

  expect(expectValue).toStrictEqual(resultValue);
});

test('Add Todo Items Testing', () => {
  // given
  const prevState = {
    todoItems: [],
    label: [],
  };

  const addTodoParams: Todo = {
    title: 'test-github-api',
    body: 'Testing github api',
    labelList: [],
  };

  // when
  const resultValue = todoReducer(prevState, addTodo(addTodoParams));

  const expectValue = {
    todoItems: [],
    label: [],
  };

  expect(expectValue).toStrictEqual(resultValue);
});
