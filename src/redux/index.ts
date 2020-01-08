import { combineReducers } from 'redux';
import { TestState, testReducer } from './modules/test';

export interface StoreState {
  todos: TestState;
}

export default combineReducers<StoreState>({
  todos: testReducer,
});
