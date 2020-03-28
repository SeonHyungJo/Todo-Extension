export type TODO_LIST = Array<Todo>;
export type LABEL_LIST = Array<Label>;
export type REPOSITORY_ID = string;
export type TOKEN = string;
export type LABEL_ID = string;
export type TODO_ID = string;

export interface Label {
  id: LABEL_ID;
  name: string;
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

export type GET_CONFIG = Omit<Config, 'token' | 'repoId'>;

// ===== GITHUB MODEL =====
export interface Github_Edges<T> {
  edges: Array<Github_Node<T>>;
}

export interface Github_Node<T> {
  node: T;
}

export interface Github_Issue {
  id: string;
  title: string;
  bodyHTML: string;
  labels: Github_Edges<Label>;
}
