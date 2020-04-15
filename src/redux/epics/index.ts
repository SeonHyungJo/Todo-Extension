import { combineEpics } from 'redux-observable';
import TODO_EPICS from '@/redux/epics/todoEpic';
import LABEL_EPICS from '@/redux/epics/labelEpic';

export default combineEpics(TODO_EPICS, LABEL_EPICS);
