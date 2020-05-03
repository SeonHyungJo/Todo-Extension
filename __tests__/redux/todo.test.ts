import { todoReducer, ITodoState, successRequestTodo } from '@/redux/todo';
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
        status: 'normal',
        labelList: [],
      },
      {
        title: 'test',
        body: '',
        id: 'MDU6SXNzdWU1NTExMjkzNTQ=',
        status: 'normal',
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
    id: 'testid',
    labelList: [],
  };

  // when
  const resultValue = todoReducer(prevState, {
    type: 'todo/ADD',
    payload: addTodoParams,
  });

  const expectValue: ITodoState = {
    todoItems: [addTodoParams],
    label: [],
  };

  expect(expectValue).toStrictEqual(resultValue);
});

test('Update Todo Items Testing', () => {
  // given
  const prevState = {
    todoItems: [
      {
        title: 'test2',
        body: '<p>test2</p>',
        id: 'MDU6SXNzdWU1NTA3NDM3NDQ=',
        status: 'normal',
        labelList: [],
      },
    ],
    label: [],
  };

  const updateTodoState: Todo = {
    id: 'MDU6SXNzdWU1NTA3NDM3NDQ=',
    title: 'test3',
    body: '<p>test2</p>',
    labelList: [],
  };

  // when
  const resultValue = todoReducer(prevState, {
    type: 'todo/UPDATE',
    payload: {
      ...updateTodoState,
    },
  });

  const expectValue: ITodoState = {
    todoItems: [
      {
        id: 'MDU6SXNzdWU1NTA3NDM3NDQ=',
        title: 'test3',
        body: '<p>test2</p>',
        status: 'normal',
        labelList: [],
      },
    ],
    label: [],
  };

  expect(expectValue).toStrictEqual(resultValue);
});

test('Delete Todo Items Testing', () => {
  // given
  const prevState = {
    todoItems: [
      {
        title: 'test2',
        body: '<p>test2</p>',
        id: 'MDU6SXNzdWU1NTA3NDM3NDQ=',
        status: 'normal',
        labelList: [],
      },
      {
        title: 'test',
        body: '',
        id: 'MDU6SXNzdWU1NTExMjkzNTQ=',
        status: 'normal',
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

  const issueIdForDelete: string = 'MDU6SXNzdWU1NTA3NDM3NDQ=';

  // when
  const resultValue = todoReducer(prevState, {
    type: 'todo/DELETE',
    payload: {
      id: issueIdForDelete,
    },
  });

  const expectValue: ITodoState = {
    todoItems: prevState.todoItems.filter(
      (item) => item.id !== issueIdForDelete,
    ),
    label: [],
  };

  expect(expectValue).toStrictEqual(resultValue);
});
