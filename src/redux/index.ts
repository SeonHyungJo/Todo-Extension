import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import logger from 'redux-logger';

import { authReducer, authEpic } from '@/redux/auth';
import { todoReducer } from '@/redux/todo';
import EPICS from '@/redux/epics';

export interface ActionInterface {
  type: string;
  payload: any;
}

const rootReudcer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

const rootEpic = combineEpics(authEpic, EPICS);
const epicMiddleware = createEpicMiddleware<ActionInterface>();

export default function configureStore() {
  const store = createStore(
    rootReudcer,
    applyMiddleware(epicMiddleware, logger),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
