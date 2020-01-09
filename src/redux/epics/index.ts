import { TEST, TestAction } from '../models/main';
import { Observable, Action } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { StateObservable, combineEpics, ofType } from 'redux-observable';

export const fetchUserEpic = (
  action$: Observable<Action>,
): Observable<Action> => {
  return action$.pipe(
    ofType(TEST),
    mergeMap((action: TestAction) => console.log('')),
  );
};

export const rootEpic = combineEpics(fetchUserEpic);
