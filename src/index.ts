import { actionCreators } from './redux/modules/test';
import configureStore from './redux';
import './index.css';

const store = configureStore();

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(actionCreators.test('test2222'));
