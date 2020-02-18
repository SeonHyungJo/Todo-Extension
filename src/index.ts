import configureStore from './redux';
import { userLogin } from './redux/auth';
import { addTodo } from './redux/todo';

const store = configureStore();
store.dispatch(
  addTodo({
    title: 'todo_add 추가',
    body: 'todo add 기능 추가하기',
    id: '123',
    modified: false,
    labelList: [
      {
        ID: 'sdfsdfsdf',
        title: '개인',
        color: 'red',
      },
    ],
  }),
);
