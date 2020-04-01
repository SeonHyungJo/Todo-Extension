import { todoReducer, ITodoState, LABEL_SET } from '@/redux/todo';
import { LABEL_LIST } from '@/model';

const newLabels: LABEL_LIST = [
  { id: 'MDU6TGFiZWwxNzkxMDk1NzIy', name: 'bug', color: 'd73a4a' },
  {
    id: 'MDU6TGFiZWwxNzkxMDk1NzIz',
    name: 'documentation',
    color: '0075ca',
  },
  { id: 'MDU6TGFiZWwxNzkxMDk1NzI0', name: 'duplicate', color: 'cfd3d7' },
  { id: 'MDU6TGFiZWwxNzkxMDk1NzI1', name: 'enhancement', color: 'a2eeef' },
  { id: 'MDU6TGFiZWwxNzkxMDk1NzI2', name: 'help wanted', color: '008672' },
  {
    id: 'MDU6TGFiZWwxNzkxMDk1NzI3',
    name: 'good first issue',
    color: '7057ff',
  },
  { id: 'MDU6TGFiZWwxNzkxMDk1NzI4', name: 'invalid', color: 'e4e669' },
  { id: 'MDU6TGFiZWwxNzkxMDk1NzI5', name: 'question', color: 'd876e3' },
  { id: 'MDU6TGFiZWwxNzkxMDk1NzMw', name: 'wontfix', color: 'ffffff' },
];

test('Get Labels Testing', () => {
  // given
  const prevState = {
    todoItems: [],
    label: [],
  };

  // when
  const resultValue = todoReducer(prevState, {
    type: LABEL_SET,
    payload: newLabels,
  });

  // done
  const expectValue: ITodoState = {
    todoItems: [],
    label: newLabels,
  };

  expect(expectValue).toStrictEqual(resultValue);
});
