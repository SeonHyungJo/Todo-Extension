// payload interface
export interface DataParam {
  text: string;
}

export interface TestState {
  text: string;
}

// type
export const TEST = 'TEST';

interface TestAction {
  type: typeof TEST;
  payload: DataParam;
}

export type ActionType = TestAction;

// action
const test = (inputText: string) => {
  return {
    type: TEST,
    payload: {
      text: inputText,
    },
  };
};

export const actionCreators = {
  test,
};

// initialState
const initialState: TestState = {
  text: '',
};

//reducer
export function testReducer(
  state = initialState,
  action: ActionType,
): TestState {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        text: action.payload.text,
      };
    default:
      return { text: '' };
  }
}
