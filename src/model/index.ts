interface Todo {
  itemList: Array<Item>;
}

interface InputData {
  title: string;
  body: string;
  label: Array<Label>;
}

interface Item {
  id: string;
  sync: boolean;
  inputData: InputData;
}

interface Label {
  id: string;
  color: string;
  name: string;
}

interface Config {
  owner: string;
  repoName: string;
  token?: string;
}

interface UpdateIssueParams {
  repositoryId: string;
  body: string;
  title: string;
}

interface CreateLabelParams {
  repositoryId: string;
  name: string;
  color: string;
  description?: string;
}

export { Todo, Item, Label, Config, UpdateIssueParams, CreateLabelParams };
