import { Config } from '@/model';

export const getLabelQuery = ({ repositoryName, owner }: Config): string => `
  query {
    repository(name: "${repositoryName}", owner: "${owner}") {
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
