import { combineEpics } from 'redux-observable';
import fetchUserEpic from './fetchEdpic';

export const rootEpic = combineEpics(fetchUserEpic);
