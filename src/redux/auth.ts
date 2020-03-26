import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { mergeMap, map } from 'rxjs/operators';
import { createAction } from 'redux-actions';
import { ofType, combineEpics, Epic } from 'redux-observable';

import { ActionInterface } from '@/redux';
import { getRepoId } from '@/githubApi/repo';
import { request } from '@/redux/common';
import { setItem, getItem } from '@/utils/localStorage';

// payload interface
export interface IState {
  repoName: string;
  owner: string;
  token: string;
  repoID: string;
}

export type IUserLoginParam = Omit<IState, 'repoID'>;

// type
export const USER_LOGIN = 'auth/USER_LOGIN';
export const USER_LOGIN_FAIL = 'auth/USER_LOGIN_FAIL';
export const USER_LOGIN_ASYNC = 'auth/USER_LOGIN_ASYNC';

export const USER_LOGOUT = 'auth/USER_LOGOUT';

// action
export const userLogin = createAction(
  USER_LOGIN_ASYNC,
  ({ repoName, token, owner }: IUserLoginParam) => ({
    repoName,
    token,
    owner,
  }),
);

export const userLoginEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(USER_LOGIN_ASYNC),
    mergeMap((action: ActionInterface) => {
      return request(getRepoId(action.payload)).pipe(
        map(({ response: { data } }: AjaxResponse) => ({
          type: USER_LOGIN,
          payload: { ...action.payload, repoID: data.repository.id },
        })),
      );
    }),
  );
};

// TODO feature: 로그아웃

// initialState
const CONFIG_KEY = 'config';
const defaultState: IState = {
  repoName: '',
  owner: '',
  token: '',
  repoID: '',
};

const initialState: IState = getItem(CONFIG_KEY, defaultState, true);

//reducer
export function authReducer(state = initialState, action: any): IState {
  switch (action.type) {
    case USER_LOGIN:
      setItem(CONFIG_KEY, action.payload, true);

      return {
        ...action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        ...action.payload,
      };
    case USER_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export const authEpic = combineEpics(userLoginEpic);
