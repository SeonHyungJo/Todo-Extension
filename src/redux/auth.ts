import { Observable } from 'rxjs';
import { Action } from 'redux';
import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, mapTo } from 'rxjs/operators';

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
export const USER_LOGIN_TEST = 'auth/USER_LOGIN_TEST';
export const USER_LOGIN = 'auth/USER_LOGIN';

// action
export const userLogin = ({ repoName, token, owner }: IUserLoginParam) => ({
  type: USER_LOGIN,
  payload: {
    repoName,
    token,
    owner,
  },
});

const userLoginEpic = (action$: Observable<Action>): Observable<Action> => {
  return action$.pipe(ofType(USER_LOGIN_TEST), mapTo({ type: USER_LOGIN }));
};

export const authEpic = combineEpics(userLoginEpic);

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
      console.log('짠');
      return {
        ...state,
        repoID: action.payload.repoID,
      };
    default:
      return state;
  }
}
