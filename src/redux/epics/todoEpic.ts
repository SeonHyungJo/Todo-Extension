import { Observable, of } from 'rxjs';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { mergeMap, map, catchError, delay } from 'rxjs/operators';
import { AjaxResponse } from 'rxjs/ajax';

import { ActionInterface } from '@/redux';
import { request } from '@/redux/common';
import { getLabels } from '@/utils/common';
import { TODO_ID } from '@/model';
import {
  getIssueQuery,
  createIssueQuery,
  updateIssueQuery,
  deleteIssueQuery,
} from '@/githubApi/issue';
import {
  TODO_ADD_BATCH,
  TODO_ITEM_SET,
  BATCH,
  TODO_GET,
  TODO_UPDATE,
  TODO_DELETE,
  TODO_DELETE_ASYNC,
  successRequestTodo,
  TODO_ADD,
  TODO_UPDATE_ASYNC,
} from '@/redux/todo';

const fetchCreateFulfilled = (
  targetId: TODO_ID,
  {
    response: {
      data: {
        createIssue: { issue },
      },
    },
  }: AjaxResponse,
) => {
  return {
    type: TODO_ITEM_SET,
    payload: {
      targetId,
      todoItem: {
        updatedAt: issue.updatedAt,
        id: issue.id,
        title: issue.title,
        body: issue.bodyHTML,
        labelList: getLabels(issue.labels),
      },
    },
  };
};

const catchErrorToBatch = (type: string, payload: any) => {
  return {
    type: BATCH,
    payload: {
      type,
      payload,
    },
    error: true,
  };
};

export const getTodoEpic: Epic<ActionInterface> = (
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

export const addTodoEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
  state$: StateObservable<any>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(TODO_ADD, TODO_ADD_BATCH),
    mergeMap(({ payload }: ActionInterface) => {
      const respositoryID = state$.value?.auth.repoID;

      return request(createIssueQuery(respositoryID, payload)).pipe(
        map((response: AjaxResponse) =>
          fetchCreateFulfilled(payload.id, response),
        ),
        catchError(() => of(catchErrorToBatch(TODO_ADD, payload))),
      );
    }),
  );
};

export const updateTodoEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
  state$: StateObservable<any>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(TODO_UPDATE_ASYNC),
    mergeMap((action: ActionInterface) =>
      request(updateIssueQuery(action.payload)).pipe(
        map(({ response: { data } }: AjaxResponse) => ({
          type: TODO_UPDATE,
          payload: {
            ...data.updateIssue.issue,
          },
        })),
      ),
    ),
  );
};

export const deleteTodoEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
  state$: StateObservable<any>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(TODO_DELETE_ASYNC),
    mergeMap((action: ActionInterface) => {
      const issueID = action.payload && action.payload.id;
      return request(deleteIssueQuery(issueID)).pipe(
        map(({ response: { data } }: AjaxResponse) => ({
          type: TODO_DELETE,
          payload: {
            ...action.payload,
            id: data.closeIssue.issue.id,
          },
        })),
      );
    }),
  );
};

// TODO feature: 투두 추가|수정|삭제 이후 서버의 데이터와 일치하는지 확인하는 기능

export const batchEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(BATCH),
    delay(4000),
    map(({ payload }: ActionInterface) => {
      return {
        ...payload,
        type: payload.type + '/BATCH',
      };
    }),
  );
};
