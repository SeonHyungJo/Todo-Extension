import { Github_Edges, Label, LABEL_LIST } from '@/model';

export const getLabels = (labels: Github_Edges<Label>): LABEL_LIST => {
  return labels.edges.map(({ node }) => ({
    ...node,
  }));
};

export const createUniqueId = () => {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
