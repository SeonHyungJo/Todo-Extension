import { createStore } from 'redux';
import { testReducer, TEST } from './redux';
import './index.css';

const store = createStore(testReducer);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: TEST,
  payload: {
    id: 1,
    text: 'test',
    done: false,
  },
});
