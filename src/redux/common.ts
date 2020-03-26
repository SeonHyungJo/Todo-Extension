import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Observable } from 'rxjs';

const TOKEN: string = process.env.TOKEN || '';
const END_POINT = process.env.END_POINT || 'https://api.github.com/graphql';

const HEADER = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const request = (
  query: string,
  token: string = TOKEN,
): Observable<AjaxResponse> => {
  return ajax.post(END_POINT, { query }, HEADER(token));
};
