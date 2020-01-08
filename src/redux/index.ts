import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { TestState, testReducer } from './modules/test';
import { rootEpic } from './epics';
const epicMiddleware = createEpicMiddleware();

export interface StoreState {
  todos: TestState;
}

const modules = combineReducers<StoreState>({
  todos: testReducer,
});

export default function configureStore() {
  const store = createStore(
    modules,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(epicMiddleware),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
