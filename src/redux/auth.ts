import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Action } from 'redux';
import { ofType, combineEpics } from 'redux-observable';
import { mapTo, mergeMap, map } from 'rxjs/operators';
import { createAction } from 'redux-actions';
import { getRepoId } from '@/githubApi/repo';

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
// epic
// TODO feature: 로그인|token확인|RepoId 받아오기
export const userLogin = createAction(
  USER_LOGIN_ASYNC,
  ({ repoName, token, owner }: IUserLoginParam) => ({
    repoName,
    token,
    owner,
  }),
);

export const userLoginEpic = (
  action$: Observable<Action>,
): Observable<Action> => {
  return action$.pipe(
    ofType(USER_LOGIN_ASYNC),
    mergeMap(action => {
      console.log('userLoginEpic ===> ', action);
      return ajax
        .post(
          process.env.END_POINT || '',
          {
            query: getRepoId({
              repoName: 'test-github-api',
              owner: 'seonhyungjo',
              token: process.env.TOKEN || '',
            }),
          },
          {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.TOKEN}`,
          },
        )
        .pipe(
          map(({ response: { data } }: AjaxResponse) => ({
            type: USER_LOGIN,
            payload: data,
          })),
        );
    }),
  );
};

// TODO feature: 로그아웃

// initialState
const initialState: IState = {
  repoName: '',
  owner: '',
  token: '',
  repoID: '',
};

//reducer
export function authReducer(state = initialState, action: any): IState {
  console.log('Auth Reducer ', action);
  switch (action.type) {
    case USER_LOGIN:
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
