import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import logger from 'redux-logger';
import { authReducer, authEpic } from './auth';

const rootReudcer = combineReducers({
  auth: authReducer,
});
const rootEpic = combineEpics(authEpic);
const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReudcer,
    applyMiddleware(epicMiddleware, logger),
  );

  epicMiddleware.run(rootEpic);

  return store;
}
