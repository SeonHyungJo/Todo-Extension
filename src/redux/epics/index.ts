import { combineEpics } from 'redux-observable';
import * as LABEL_EPICS from '@/redux/epics/labelEpic';
import * as TODO_EPICS from '@/redux/epics/todoEpic';

export default combineEpics({ LABEL_EPICS, TODO_EPICS });
