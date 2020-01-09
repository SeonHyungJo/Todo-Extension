import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import { rootReudcer } from './reducers';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReudcer,
    applyMiddleware(epicMiddleware, logger),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
