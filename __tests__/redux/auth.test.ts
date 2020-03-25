import { authReducer, IUserLoginParam, IState, USER_LOGIN } from '@/redux/auth';

test('Auth Feature Testing', () => {
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
