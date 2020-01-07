import { TEST } from '../action';

export interface TestState {
  text: string;
}

export interface DataParams {
  id: number;
  text: string;
  done: boolean;
}

export interface TestAction {
  type: typeof TEST;
  payload: DataParams;
}

export type ActionTypes = TestAction;
