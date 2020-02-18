import { createAction, handleActions } from 'redux-actions';
import { addTodoApi } from '@githubApi/todoApi';

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
const TODO_ADD = 'todo/ADD';
const TODO_UPDATE = 'todo/UPDATE';
const TODO_DELETE = 'todo/DELETE';

// action
export const addTodo = createAction(TODO_ADD, addTodoApi);
export const updateTodo = createAction(TODO_UPDATE, addTodoApi);
export const delTodo = createAction(TODO_DELETE, addTodoApi);

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
