import { Observable, of } from 'rxjs';
import { Epic, ofType, StateObservable, combineEpics } from 'redux-observable';
import { mergeMap, map, catchError, delay, debounceTime } from 'rxjs/operators';
import { AjaxResponse } from 'rxjs/ajax';

import { ActionInterface } from '@/redux';
import { request } from '@/redux/common';
import { getLabels, getIssues } from '@/utils/common';
import { TODO_ID } from '@/model';
import {
  getIssueQuery,
  createIssueQuery,
  updateIssueQuery,
  deleteIssueQuery,
} from '@/githubApi/issue';
import {
  BATCH,
  TODO_GET,
  TODO_SET,
  TODO_ITEM_SET,
  TODO_ADD,
  TODO_UPDATE,
  TODO_DELETE,
  TODO_ADD_BATCH,
  TODO_UPDATE_BATCH,
  TODO_DELETE_BATCH,
  TODO_SYNC,
  TODO_GET_BATCH,
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

const getTodoEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
  state$: StateObservable<any>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(TODO_GET, TODO_GET_BATCH),
    mergeMap(() => {
      return request(getIssueQuery(state$.value.auth)).pipe(
        map(({ response: { data } }: AjaxResponse) => ({
          type: TODO_SET,
          payload: getIssues(data.repository.issues),
        })),
        catchError(() => of(catchErrorToBatch(TODO_GET, {}))),
      );
    }),
  );
};

const addTodoEpic: Epic<ActionInterface> = (
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

const updateTodoEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
  state$: StateObservable<any>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(TODO_UPDATE, TODO_UPDATE_BATCH),
    mergeMap(({ payload }: ActionInterface) =>
      request(updateIssueQuery(payload)).pipe(
        map(({ response: { data } }: AjaxResponse) => ({
          type: TODO_SYNC,
          payload: {
            ...data.updateIssue.issue,
          },
        })),
        catchError(() => of(catchErrorToBatch(TODO_UPDATE, payload))),
      ),
    ),
  );
};

const deleteTodoEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
  state$: StateObservable<any>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(TODO_DELETE, TODO_DELETE_BATCH),
    mergeMap(({ payload }: ActionInterface) => {
      const issueID = payload && payload.id;

      return request(deleteIssueQuery(issueID)).pipe(
        map(({ response: { data } }: AjaxResponse) => ({
          type: TODO_SYNC,
          payload: {
            ...payload,
            id: data.closeIssue.issue.id,
          },
        })),
        catchError(() => of(catchErrorToBatch(TODO_DELETE, payload))),
      );
    }),
  );
};

const syncEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(TODO_SYNC),
    debounceTime(3000),
    map(({ payload }: ActionInterface) => {
      return {
        type: 'TEST',
        payload,
      };
    }),
  );
};

const batchEpic: Epic<ActionInterface> = (
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

export default combineEpics(
  getTodoEpic,
  addTodoEpic,
  updateTodoEpic,
  deleteTodoEpic,
  batchEpic,
  syncEpic,
);
