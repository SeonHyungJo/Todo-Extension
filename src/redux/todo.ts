import { createAction, handleActions } from 'redux-actions';

// payload interface
export type TODO_LIST = Array<Todo>;
export type LABEL_LIST = Array<Label>;
export type LABEL_ID = string;
export type TODO_ID = string;

export interface Label {
  id: LABEL_ID;
  title: string;
  color: string;
}

export interface Todo {
  title: string;
  body: string;
  id?: TODO_ID;
  modified?: boolean;
  labelList?: LABEL_LIST;
}

export interface TodoState {
  todo: TODO_LIST;
  label: LABEL_LIST;
}

// type
const TODO_GET = 'todo/GET';
const TODO_ADD = 'todo/ADD';
const TODO_DONE = 'todo/DONE';
const TODO_UPDATE = 'todo/UPDATE';
const TODO_DELETE = 'todo/DELETE';

const LABEL_GET = 'label/GET';

// action
export const getTodo = createAction(TODO_GET);
export const addTodo = createAction(TODO_ADD);
export const doneTodo = createAction(TODO_DONE);
export const updateTodo = createAction(TODO_UPDATE);
export const delTodo = createAction(TODO_DELETE);

export const getLabel = createAction(LABEL_GET);

// epic
// TODO feature: 투두 추가

// TODO feature: 투두 내용|제목|라벨 수정

// TODO feature: 투두 Close

// TODO feature: 투두 삭제

// TODO feature: 투두 추가|수정|Close|삭제 이후 서버의 데이터와 일치하는지 확인하는 기능

// initialState
const initialState: TodoState = {
  todo: [],
  label: [],
};

//reducer
export const todoReducer = handleActions(
  {
    [TODO_ADD]: (state: TodoState, action: any): TodoState => {
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };
    },
    [TODO_UPDATE]: (state: TodoState, { payload }: any): TodoState => {
      const targetId = payload.id;
      const newTodo = state.todo.map(item =>
        item.id === targetId ? payload : item,
      );
      return {
        ...state,
        todo: [...newTodo],
      };
    },
    [TODO_DELETE]: (state: TodoState, { payload: { id } }: any): TodoState => {
      const newTodo = state.todo.filter(item => item.id !== id);
      return {
        ...state,
        todo: [...newTodo],
      };
    },
  },
  initialState,
);
