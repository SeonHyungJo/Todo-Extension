import { createAction, handleActions, Action } from 'redux-actions';

import { setItem, getItem } from '@/utils/localStorage';
import { createUniqueId } from '@/utils/common';
import {
  TODO_LIST,
  LABEL_LIST,
  Todo,
  Label,
  Github_Issue,
  Github_Node,
  Github_Edges,
  TODO_ID,
} from '@/model';

// payload interface
export interface ITodoState {
  todoItems: TODO_LIST;
  label: LABEL_LIST;
}

const STATUS_CREATE = 'created';
const STATUS_MODIFY = 'modify';
const STATUS_DELETE = 'delete';
const STATUS_NORMAL = 'normal';

// type
export const BATCH = 'todo/BATCH';

export const TODO_GET = 'todo/GET';
export const TODO_SET = 'todo/GET/SUCCESS';
export const TODO_ITEM_SET = 'todo/ITEM/SET';

export const TODO_ADD = 'todo/ADD';
export const TODO_ADD_BATCH = 'todo/ADD/BATCH';

export const TODO_UPDATE = 'todo/UPDATE';
export const TODO_UPDATE_ASYNC = 'todo/UPDATE_ASYNC';

export const TODO_DELETE = 'todo/DELETE';
export const TODO_DELETE_ASYNC = 'todo/DELETE_ASYNC';

export const LABEL_SET = 'label/SET';
export const LABEL_GET = 'label/GET';

export const TODO_FAIL = 'todo/GET/FAIL';

// action
export const getTodo = createAction(TODO_GET);
export const successRequestTodo = createAction(
  TODO_SET,
  ({ edges }: Github_Edges<Github_Issue>) => {
    const todoList: Array<Todo> = edges.map(
      ({ node }: Github_Node<Github_Issue>) => {
        const labelList =
          node?.labels?.edges?.map(
            ({ node }: Github_Node<Label>): Label => ({ ...node }),
          ) ?? [];

        return {
          title: node.title,
          body: node.bodyHTML,
          id: node.id,
          status: STATUS_NORMAL,
          labelList,
        };
      },
    );

    return todoList;
  },
);

export const addTodo = createAction(
  TODO_ADD,
  ({ title, body, labelList = [] }: Todo) => {
    return {
      id: createUniqueId(),
      title,
      body,
      labelList,
      status: STATUS_CREATE,
    };
  },
);

export const updateTodo = createAction(
  TODO_UPDATE_ASYNC,
  ({ id, title, body }: Todo) => ({
    id,
    title,
    body,
  }),
);

export const deleteTodo = createAction(TODO_DELETE_ASYNC, (id: TODO_ID) => ({
  id,
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
  TODO_KEY,
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
      const todoItems = state.todoItems.map(item =>
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
      const updatedTodoList = state.todoItems.map(item =>
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
      const newTodoItems = state.todoItems.filter(item => item.id !== id);
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
