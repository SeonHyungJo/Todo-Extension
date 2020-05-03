import { createAction, handleActions, Action } from 'redux-actions';

import { TODO_LIST, LABEL_LIST, Todo, TODO_ID } from '@/model';
import { setItem, getItem } from '@/utils/localStorage';
import { createUniqueId } from '@/utils/common';

// payload interface
export interface ITodoState {
  todoItems: TODO_LIST;
  label: LABEL_LIST;
}

export const STATUS_CREATE = 'created';
export const STATUS_UPDATE = 'updated';
export const STATUS_DELETE = 'deleted';
export const STATUS_NORMAL = 'normal';

// type
export const BATCH = 'todo/BATCH';

export const TODO_SET = 'todo/SET';
export const TODO_ITEM_SET = 'todo/ITEM/SET';

export const TODO_GET = 'todo/GET';
export const TODO_GET_BATCH = 'todo/GET/BATCH';

export const TODO_ADD = 'todo/ADD';
export const TODO_ADD_BATCH = 'todo/ADD/BATCH';

export const TODO_UPDATE = 'todo/UPDATE';
export const TODO_UPDATE_BATCH = 'todo/UPDATE/BATCH';

export const TODO_DELETE = 'todo/DELETE';
export const TODO_DELETE_BATCH = 'todo/DELETE/BATCH';

export const TODO_SYNC = 'todo/SYNC';

export const LABEL_SET = 'label/SET';
export const LABEL_GET = 'label/GET';

// action
export const getTodo = createAction(TODO_GET);
export const addTodo = createAction(
  TODO_ADD,
  ({
    title,
    body,
    labels = [],
    updatedAt = new Date().toISOString(),
  }: Todo) => {
    return {
      updatedAt,
      id: createUniqueId(),
      title,
      body,
      labels,
      status: STATUS_CREATE,
    };
  },
);

export const updateTodo = createAction(
  TODO_UPDATE,
  ({
    id,
    title,
    body,
    labels = [],
    updatedAt = new Date().toISOString(),
  }: Todo) => ({
    updatedAt,
    id,
    title,
    body,
    labels,
    status: STATUS_UPDATE,
  }),
);

export const deleteTodo = createAction(TODO_DELETE, (id: TODO_ID) => ({
  id,
  status: STATUS_DELETE,
}));

export const getLabel = createAction(LABEL_GET);

// initialState
const TODO_KEY = 'todo';
const LABEL_KEY = 'label';
const defaultTodoList: TODO_LIST = [];
const defaultLabelList: LABEL_LIST = [];

const initialTodoListState: TODO_LIST = getItem(
  TODO_KEY,
  defaultTodoList,
  false,
);

const initialLabelListState: LABEL_LIST = getItem(
  LABEL_KEY,
  defaultLabelList,
  false,
);

const initialState: ITodoState = {
  todoItems: initialTodoListState,
  label: initialLabelListState,
};

//reducer
export const todoReducer = handleActions<ITodoState, any>(
  {
    [TODO_SET]: (
      state: ITodoState,
      { payload }: Action<TODO_LIST>,
    ): ITodoState => {
      setItem(TODO_KEY, payload, false);

      return {
        ...state,
        todoItems: payload,
      };
    },
    [TODO_ITEM_SET]: (
      state: ITodoState,
      { payload }: Action<any>,
    ): ITodoState => {
      const todoItems = state.todoItems.map((item) =>
        item.id === payload.targetId
          ? { ...payload.todoItem, status: STATUS_NORMAL }
          : item,
      );
      setItem(TODO_KEY, todoItems, false);

      return {
        ...state,
        todoItems,
      };
    },
    [TODO_ADD]: (state: ITodoState, action: Action<Todo>): ITodoState => {
      const addedTodoList: TODO_LIST = [...state.todoItems, action.payload];
      setItem(TODO_KEY, addedTodoList, false);

      return {
        ...state,
        todoItems: [...addedTodoList],
      };
    },
    [TODO_UPDATE]: (
      state: ITodoState,
      { payload }: Action<Todo>,
    ): ITodoState => {
      const targetId = payload.id;
      const updatedTodoList = state.todoItems.map((item) =>
        item.id === targetId ? { ...payload } : item,
      );
      setItem(TODO_KEY, updatedTodoList, false);

      return {
        ...state,
        todoItems: [...updatedTodoList],
      };
    },
    [TODO_DELETE]: (
      state: ITodoState,
      { payload: { id } }: Action<Todo>,
    ): ITodoState => {
      const newTodoItems = state.todoItems.filter((item) => item.id !== id);
      setItem(TODO_KEY, newTodoItems, false);

      return {
        ...state,
        todoItems: [...newTodoItems],
      };
    },
    [LABEL_SET]: (
      state: ITodoState,
      { payload }: Action<LABEL_LIST>,
    ): ITodoState => {
      setItem(LABEL_KEY, payload, false);

      return {
        ...state,
        label: payload,
      };
    },
  },
  initialState,
);
