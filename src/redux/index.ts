import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import { testReducer } from './models/main';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    testReducer,
    applyMiddleware(epicMiddleware, logger),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
