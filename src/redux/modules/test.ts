export interface DataParams {
  text: string;
}

export interface TestState {
  text: string;
  complete?: string;
}

/* type */
export const TEST = 'TEST';
export const COMPLETE = 'COMPLETE';

export interface TestAction {
  type: typeof TEST;
  payload: DataParams;
}

export interface CreateAction {
  type: typeof COMPLETE;
  payload: DataParams;
}

export type ActionTypes = TestAction | CreateAction;

/* action */
function test(text: string): TestAction {
  return {
    type: TEST,
    payload: {
      text: text,
    },
  };
}

function complete(): CreateAction {
  return {
    type: COMPLETE,
    payload: {
      text: 'complete',
    },
  };
}

export const actionCreators = {
  test,
  complete,
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
    case COMPLETE:
      return {
        ...state,
        complete: action.payload.text,
      };
    default:
      return state;
  }
}
