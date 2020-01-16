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
  token: string;
}

export { Todo, Item, Label, Config };
