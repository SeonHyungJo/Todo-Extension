import configureStore from './redux';
import { userLogin } from './redux/auth';

const store = configureStore();
store.dispatch(
  userLogin({
    repoName: 'Todo-Extension',
    owner: 'SeonhyungJo',
    token: 'aaaa',
  }),
);
