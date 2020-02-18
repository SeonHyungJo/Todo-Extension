// // import { createAction, handleActions } from 'redux-actions';

// // payload interface
// export type TODO_LIST = Array<Todo>;
// export type LABEL_LIST = Array<Label>;
// export type LABEL_ID = string;
// export type TODO_ID = string;

// export interface Label {
//   ID: LABEL_ID;
//   title: string;
//   color: string;
// }

// export interface Todo {
//   title: string;
//   body: string;
//   id?: TODO_ID;
//   modified?: boolean;
//   labelList?: LABEL_LIST;
// }

// export interface TodoState {
//   todo: TODO_LIST;
//   label: LABEL_LIST;
// }

// // type
// export const TODO_UPDATE = 'todo/UPDATE';
// export const TODO_DELETE = 'todo/DELETE';

// // action
// export const addTodo = createAction('TODO_ADD', {
//   title,
//   body,
//   id,
//   modified = false,
//   labelList =[],
// }: Todo) => ({
//   type: TODO_ADD,
//   payload: {
//     title,
//     body,
//     id,
//     modified,
//     labelList,
//   },
// });

// // initialState
// const initialState: TodoState = {
//   todo: [],
//   label: [],
// };

// //reducer
// export const todoReducer = handleActions(
//   {
//     [TODO_ADD]: (state: TodoState, action: any): TodoState => ({
//       ...state,
//       todo: [...state.todo, action.payload],
//     }),
//   },
//   initialState,
// );
