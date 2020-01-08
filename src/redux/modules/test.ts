export interface DataParams {
  id: number;
  text: string;
  done: boolean;
}

export interface TestState {
  text: string;
}

/* type */
export const TEST = 'TEST';

export interface TestAction {
  type: typeof TEST;
  payload: DataParams;
}

export interface CreateAction {
  type: typeof TEST;
  payload: DataParams;
}

export type ActionTypes = TestAction | CreateAction;

/* action */
function test(text: string) {
  return {
    type: TEST,
    payload: {
      text: text,
    },
  };
}

export const actionCreators = {
  test,
};

/* reducers */
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
