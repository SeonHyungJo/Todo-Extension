import { Config } from '@/model';

//todo Read
export const getLabelQuery = ({ repositoryName, owner }: Config): string => {
  return `
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
};
