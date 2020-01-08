import { TEST, actionCreators } from '../modules/test';
import { Epic, ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';

const fetchUserEpic: Epic = action$ =>
  action$.pipe(
    ofType(TEST),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo(actionCreators.complete()),
  );

export default fetchUserEpic;
