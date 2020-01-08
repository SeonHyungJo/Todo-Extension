import { createStore } from 'redux';
import modules from './redux';
import { actionCreators } from './redux/modules/test';
import './index.css';

const store = createStore(
  modules,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(actionCreators.test('test2222'));
