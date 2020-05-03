import {
  Github_Edges,
  Github_Node,
  Github_Issue,
  TODO_LIST,
  Label,
  LABEL_LIST,
} from '@/model';
import { STATUS_NORMAL } from '@/redux/todo';

export const getIssues = (issues: Github_Edges<Github_Issue>): TODO_LIST => {
  return issues.edges.map(({ node }: Github_Node<Github_Issue>) => ({
    updatedAt: node.updatedAt,
    title: node.title,
    body: node.bodyHTML,
    id: node.id,
    status: STATUS_NORMAL,
    labelList: getLabels(node.labels),
  }));
};

export const getLabels = (labels: Github_Edges<Label>): LABEL_LIST => {
  return labels.edges.map(({ node }) => ({
    ...node,
  }));
};

export const createUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};
