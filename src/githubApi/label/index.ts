import { Config } from '@/model';

export const getLabelQuery = ({ repoName, owner }: Config): string => `
  query {
    repository(name: "${repoName}", owner: "${owner}") {
      id
      labels(first: 100) {
        edges {
          node {
            id
            color
            name
          }
        }
      }
    }
  }
`;
