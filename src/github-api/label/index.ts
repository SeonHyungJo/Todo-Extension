import { Config } from '@model/index';

//todo Create
const createLabelQuery = () => {};

//todo Read
const getLabelQuery = ({ repoName, owner }: Config): string => {
  return `
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
};

export { createLabelQuery, getLabelQuery };
