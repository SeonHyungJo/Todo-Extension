export type repositoryId = string;
export type token = string;
export type labelId = string;
export type todoId = string;

export interface Label {
  ID: labelId;
  title: string;
  color: string;
  repositoryId?: repositoryId;
}

export type LabelList = Array<Label>;

export interface Todo {
  repositoryId: repositoryId;
  title: string;
  body: string;
  ID?: todoId;
  modified?: boolean;
  labelList?: Array<Label>;
}

export type TodoList = Array<Todo>;

export interface Config {
  token: token;
  repositoryId: repositoryId;
  owner: string;
  repositoryName: string;
}
