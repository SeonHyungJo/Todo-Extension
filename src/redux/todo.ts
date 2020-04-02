import { Observable } from 'rxjs';
import { createAction, handleActions, Action } from 'redux-actions';
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
  Github_Edges,
} from '@/model';
import { ActionInterface } from '@/redux';
import { request } from './common';
import {
  getIssueQuery,
  createIssueQuery,
  updateIssueQuery,
} from '@/githubApi/issue';
import { setItem } from '@/utils/localStorage';
import { getLabelQuery } from '@/githubApi/label';

// payload interface
export interface ITodoState {
  todoItems: TODO_LIST;
  label: LABEL_LIST;
}

// type
export const TODO_GET = 'todo/GET';
export const TODO_SET = 'todo/GET/SUCCESS';

export const TODO_ADD = 'todo/ADD';
export const TODO_ADD_ASYNC = 'todo/ADD_ASYNC';

export const TODO_DONE = 'todo/DONE';

export const TODO_UPDATE = 'todo/UPDATE';
export const TODO_UPDATE_ASYNC = 'todo/UPDATE_ASYNC';

export const TODO_DELETE = 'todo/DELETE';

export const LABEL_GET = 'label/GET';
export const LABEL_SET = 'label/SET';

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
          modified: false,
          labelList,
        };
      },
    );

    return todoList;
  },
);

export const addTodo = createAction(
  TODO_ADD_ASYNC,
  ({ title, body, labelList }: Todo) => {
    return {
      title,
      body,
      labelList,
    };
  },
);
export const doneTodo = createAction(TODO_DONE);

export const updateTodo = createAction(
  TODO_UPDATE_ASYNC,
  ({ id, title, body }: Todo) => {
    return {
      id,
      title,
      body,
    };
  },
);

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
        map(({ response: { data } }: AjaxResponse) =>
          successRequestTodo(data.repository.issues),
        ),
      );
    }),
  );
};

const addTodoEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
  state$: StateObservable<any>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(TODO_ADD_ASYNC),
    mergeMap((action: ActionInterface) => {
      const respositoryID = state$.value.auth && state$.value.auth.repoID;
      return request(createIssueQuery(respositoryID, action.payload)).pipe(
        map(({ response: { data } }: AjaxResponse) => ({
          type: TODO_ADD,
          payload: {
            ...action.payload,
            id: data.createIssue.issue.id,
          },
        })),
      );
    }),
  );
};

const updateTodoEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
  state$: StateObservable<any>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(TODO_UPDATE_ASYNC),
    mergeMap((action: ActionInterface) => {
      console.log('aaa', action);
      return request(updateIssueQuery(action.payload)).pipe(
        map(({ response }: AjaxResponse) => {
          const { data } = response;
          console.log(response);
          return {
            type: TODO_UPDATE,
            payload: {
              ...action.payload,
              id: data.updateIssue.issue.id,
            },
          };
        }),
      );
    }),
  );
};

// TODO feature: 투두 Close

// TODO feature: 투두 삭제

// TODO feature: 투두 추가|수정|Close|삭제 이후 서버의 데이터와 일치하는지 확인하는 기능

const getLabelEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
  state$: StateObservable<any>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(LABEL_GET),
    mergeMap(() =>
      request(getLabelQuery(state$.value.auth)).pipe(
        map(({ response: { data } }: AjaxResponse) => {
          const labelList: LABEL_LIST = data.repository.labels.edges.map(
            ({ node }: Github_Node<Label>) => ({
              id: node.id,
              name: node.name,
              color: node.color,
            }),
          );

          return {
            type: LABEL_SET,
            payload: labelList,
          };
        }),
      ),
    ),
  );
};

// initialState
const TODO_KEY = 'todo';
const LABEL_KEY = 'label';
const initialState: ITodoState = {
  todoItems: [],
  label: [],
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
    [TODO_ADD]: (state: ITodoState, action: Action<Todo>): ITodoState => {
      const addedTodoList: TODO_LIST = [...state.todoItems, action.payload];
      setItem(TODO_KEY, addedTodoList, false);

      return {
        ...state,
        todoItems: addedTodoList,
      };
    },
    [TODO_UPDATE]: (
      state: ITodoState,
      { payload }: Action<Todo>,
    ): ITodoState => {
      const targetId = payload.id;
      const updatedTodoList = state.todoItems.map(item =>
        item.id === targetId ? payload : item,
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
      const newTodo = state.todoItems.filter(item => item.id !== id);
      return {
        ...state,
        todoItems: [...newTodo],
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

export const todoEpic = combineEpics(
  getTodoEpic,
  getLabelEpic,
  addTodoEpic,
  updateTodoEpic,
);
