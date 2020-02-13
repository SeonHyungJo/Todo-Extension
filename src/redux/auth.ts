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

// action
export const userLogin = ({ repoName, token, owner }: IUserLoginParam) => ({
  type: USER_LOGIN,
  payload: {
    repoName,
    token,
    owner,
  },
});

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
        ...state,
        repoID: action.payload.repoID,
      };
    default:
      return state;
  }
}
