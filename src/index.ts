import { USER_LOGIN_TEST } from './redux/auth';
import configureStore from './redux';

const store = configureStore();
store.dispatch({ type: USER_LOGIN_TEST });
