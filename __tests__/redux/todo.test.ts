import { todoReducer, TodoState, TODO_GET_SUCCESS } from '@/redux/todo';
import { Github_Todo_Edges } from '@/model';

const newIssue: Github_Todo_Edges = [
  {
    node: {
      id: 'MDU6SXNzdWU1NTA3NDM2NTU=',
      title: 'ㅅㄷㄴㅅ',
      bodyHTML: '<p>ㅅㄷㄴㅅ</p>',
      labels: { edges: [] },
    },
  },
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
];

test('Get Todo Items Testing', () => {
  // given
  const prevState: TodoState = {
    todoItems: [],
    label: [],
  };

  // when
  const resultValue = todoReducer(prevState, {
    type: TODO_GET_SUCCESS,
    payload: newIssue,
  });

  // done
  const expectValue: TodoState = {
    todoItems: [],
    label: [],
  };

  expect(expectValue).toStrictEqual(resultValue);
});
