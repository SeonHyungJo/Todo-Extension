import { TEST } from '../action';
import { TestState, ActionTypes } from '../type';

const initialState: TestState = {
  text: '',
};

export function testReducer(
  state = initialState,
  action: ActionTypes,
): TestState {
  switch (action.type) {
    case TEST:
      return {
        text: action.payload.text,
      };
    default:
      return state;
  }
}
