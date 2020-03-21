import { Observable } from 'rxjs';
import { Action } from 'redux';
import { ofType, combineEpics } from 'redux-observable';
import { mapTo } from 'rxjs/operators';
import { createAction } from 'redux-actions';

// payload interface
export interface IUserLoginParam {
  repoName: string;
  token: string;
  owner: string;
}

export interface IState {
  repoName: string;
  owner: string;
  token: string;
  repoID: string;
}

// type
export const USER_LOGIN = 'auth/USER_LOGIN';
export const USER_LOGIN_ASYNC = 'auth/USER_LOGIN_ASYNC';
export const USER_LOGOUT = 'auth/USER_LOGOUT';

// action
export const userLogin = createAction(
  USER_LOGIN,
  ({ repoName, token, owner }: IUserLoginParam) => ({
    repoName,
    token,
    owner,
    repoID: 'testRepoID',
  }),
);

// epic
// TODO feature: 로그인|token확인|RepoId 받아오기
export const testUserLogin = ({ repoName, token, owner }: IUserLoginParam) => ({
  type: USER_LOGIN,
  payload: {
    repoName,
    token,
    owner,
    repoID: 'testRepoID',
  },
});

export const testUserLogout = () => ({
  type: USER_LOGOUT,
});

const userLoginEpic = (action$: Observable<Action>): Observable<Action> => {
  return action$.pipe(ofType(USER_LOGIN_ASYNC), mapTo({ type: USER_LOGIN }));
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
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...action.payload,
      };
    case USER_LOGOUT:
      return {
        repoName: '',
        owner: '',
        token: '',
        repoID: '',
      };
    default:
      return state;
  }
}

export const authEpic = combineEpics(userLoginEpic);
