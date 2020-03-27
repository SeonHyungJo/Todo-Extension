import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import logger from 'redux-logger';

import { authReducer, authEpic } from './auth';
import { todoReducer, todoEpic } from './todo';

export interface ActionInterface {
  type: string;
  payload: any;
}

const rootReudcer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

const rootEpic = combineEpics(authEpic, todoEpic);
const epicMiddleware = createEpicMiddleware<ActionInterface>();

export default function configureStore() {
  const store = createStore(
    rootReudcer,
    applyMiddleware(epicMiddleware, logger),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
