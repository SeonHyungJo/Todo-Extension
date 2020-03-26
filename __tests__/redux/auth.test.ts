import {
  authReducer,
  IUserLoginParam,
  IState,
  USER_LOGIN,
  USER_LOGOUT,
} from '@/redux/auth';

test('Auth Login Feature Testing', () => {
  // given
  const prevState: IState = {
    repoName: '',
    owner: '',
    token: '',
    repoID: '',
  };

  const userLogin: IUserLoginParam = {
    repoName: 'test-github-api',
    owner: 'seonhyungjo',
    token: '',
  };

  // when
  const resultValue = authReducer(prevState, {
    type: USER_LOGIN,
    payload: userLogin,
  });

  // done
  const expectValue = {
    ...userLogin,
    repoID: '',
  };

  expect(expectValue).toStrictEqual(resultValue);
});

test('Auth Logout Feature Testing', () => {
  // given
  const prevState: IState = {
    repoName: 'Dev-Docs',
    owner: 'BKJang',
    token: 'testToken',
    repoID: 'testID',
  };

  // when
  const resultValue = authReducer(prevState, {
    type: USER_LOGOUT,
  });

  // done
  const expectValue = {
    repoName: '',
    owner: '',
    token: '',
    repoID: '',
  };

  expect(expectValue).toStrictEqual(resultValue);
});
