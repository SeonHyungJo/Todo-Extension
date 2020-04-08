import { Observable } from 'rxjs';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { AjaxResponse } from 'rxjs/ajax';

import { ActionInterface } from '@/redux';
import { request } from '@/redux/common';
import { LABEL_GET, LABEL_SET } from '@/redux/todo';
import { LABEL_LIST, Label, Github_Node } from '@/model';
import { getLabelQuery } from '@/githubApi/label';

const getLabelEpic: Epic<ActionInterface> = (
  action$: Observable<ActionInterface>,
  state$: StateObservable<any>,
) => {
  return action$.pipe(
    ofType<ActionInterface>(LABEL_GET),
    mergeMap(() =>
      request(getLabelQuery(state$.value.auth)).pipe(
        map(({ response: { data } }: AjaxResponse) => {
          const labelList: LABEL_LIST = data.repository.labels.edges.map(
            ({ node }: Github_Node<Label>) => ({
              id: node.id,
              name: node.name,
              color: node.color,
            }),
          );

          return {
            type: LABEL_SET,
            payload: labelList,
          };
        }),
      ),
    ),
  );
};

export default getLabelEpic;
