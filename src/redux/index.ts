import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import { authReducer } from './auth';

const rootReudcer = combineReducers({
  auth: authReducer,
});

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReudcer,
    applyMiddleware(epicMiddleware, logger),
  );

  // epicMiddleware.run(rootEpic);

  return store;
}
