import { Config } from '@model/index';

import { GraphQLClient } from 'graphql-request';
import { getRepoId } from '@githubApi/index';

import { ajax } from 'rxjs/ajax';

const token = process.env.TOKEN || '';

const config: Config = {
  repositoryName: 'test-github-api',
  owner: 'seonhyungjo',
  token: token,
  repositoryId: '',
};

// ajax(getRepoId(config)).pipe(
//   map(response => console.log('response: ', response)),
//   catchError(error => {
//     console.log('error: ', error);
//     return of(error);
//   }),
// );
