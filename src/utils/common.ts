import { Github_Edges, Label, LABEL_LIST } from '@/model';

export const getLabels = (labels: Github_Edges<Label>): LABEL_LIST => {
  return labels.edges.map(({ node }) => ({
    ...node,
  }));
};
