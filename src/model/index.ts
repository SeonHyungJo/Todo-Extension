export type TODO_LIST = Array<Todo>;
export type LABEL_LIST = Array<Label>;
export type REPOSITORY_ID = string;
export type TOKEN = string;
export type LABEL_ID = string;
export type TODO_ID = string;

export interface Label {
  id: LABEL_ID;
  title: string;
  color: string;
}

export interface Todo {
  title: string;
  body: string;
  id?: TODO_ID;
  modified?: boolean;
  labelList?: LABEL_LIST;
}

export interface Config {
  token: TOKEN;
  owner: string;
  repoName: string;
  repoId: REPOSITORY_ID;
}
