export type TODO_LIST = Array<Todo>;
export type LABEL_LIST = Array<Label>;
export type REPOSITORY_ID = string;
export type TOKEN = string;
export type LABEL_ID = string;
export type TODO_ID = string;

export interface Label {
  ID: LABEL_ID;
  title: string;
  color: string;
}

export interface Todo {
  title: string;
  body: string;
  ID?: TODO_ID;
  modified?: boolean;
  labelList?: LABEL_LIST;
}

export interface Config {
  owner: string;
  repositoryName: string;
  token?: string;
  repositoryId?: REPOSITORY_ID;
}
