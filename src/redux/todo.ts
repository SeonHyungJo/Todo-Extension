import { Observable } from 'rxjs';
import { createAction, handleActions } from 'redux-actions';
import { Epic, ofType, combineEpics, StateObservable } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { AjaxResponse } from 'rxjs/ajax';

import {
  TODO_LIST,
  LABEL_LIST,
  Todo,
  Label,
  Github_Issue,
  Github_Node,
} from '@/model';
import { ActionInterface } from '@/redux';
import { request } from './common';
import { getIssueQuery } from '@/githubApi/issue';

// payload interface
export interface TodoState {
  todoItems: TODO_LIST;
  label: LABEL_LIST;
}

// type
export const TODO_GET = 'todo/GET';
export const TODO_GET_SUCCESS = 'todo/GET/SUCCESS';
export const TODO_GET_FAIL = 'todo/GET/FAIL';

export const TODO_ADD = 'todo/ADD';
export const TODO_DONE = 'todo/DONE';
export const TODO_UPDATE = 'todo/UPDATE';
export const TODO_DELETE = 'todo/DELETE';

export const LABEL_GET = 'label/GET';

// action
export const getTodo = createAction(TODO_GET);

export const addTodo = createAction(TODO_ADD);
export const doneTodo = createAction(TODO_DONE);
export const updateTodo = createAction(TODO_UPDATE);
export const delTodo = createAction(TODO_DELETE);

export const getLabel = createAction(LABEL_GET);

// epic
const getTodoEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
  state$: StateObservable<any>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(TODO_GET),
    mergeMap(() => {
      return request(getIssueQuery(state$.value.auth)).pipe(
        map(({ response: { data } }: AjaxResponse) => ({
          type: TODO_GET_SUCCESS,
          payload: data.repository.issues.edges,
        })),
      );
    }),
  );
};

// TODO feature: 투두 추가

// TODO feature: 투두 내용|제목|라벨 수정

// TODO feature: 투두 Close

// TODO feature: 투두 삭제

// TODO feature: 투두 추가|수정|Close|삭제 이후 서버의 데이터와 일치하는지 확인하는 기능

// initialState
const initialState: TodoState = {
  todoItems: [],
  label: [],
};

//reducer
export const todoReducer = handleActions(
  {
    [TODO_GET_SUCCESS]: (state: TodoState, action: any): TodoState => {
      const newTodoList: Array<Todo> = action.payload.map(
        ({ node }: Github_Node<Github_Issue>) => {
          const labelList =
            node?.labels?.edges?.map(
              ({ node }: Github_Node<Label>): Label => ({ ...node }),
            ) ?? [];

          return {
            title: node.title,
            body: node.bodyHTML,
            id: node.id,
            modified: false,
            labelList,
          };
        },
      );

      return {
        ...state,
        todoItems: newTodoList,
      };
    },
    [TODO_ADD]: (state: TodoState, action: any): TodoState => {
      return {
        ...state,
        todoItems: [...state.todoItems, action.payload],
      };
    },
    [TODO_UPDATE]: (state: TodoState, { payload }: any): TodoState => {
      const targetId = payload.id;
      const newTodo = state.todoItems.map(item =>
        item.id === targetId ? payload : item,
      );
      return {
        ...state,
        todoItems: [...newTodo],
      };
    },
    [TODO_DELETE]: (state: TodoState, { payload: { id } }: any): TodoState => {
      const newTodo = state.todoItems.filter(item => item.id !== id);
      return {
        ...state,
        todoItems: [...newTodo],
      };
    },
  },
  initialState,
);

export const todoEpic = combineEpics(getTodoEpic);
