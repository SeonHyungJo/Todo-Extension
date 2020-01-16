import { Config, CreateLabelParams } from '@model/index';

//todo Create
const createLabelQuery = ({
  repositoryId,
  name,
  color,
  description,
}: CreateLabelParams) => {
  return `
  mutation {
    __typename
    createLabel(input: {repositoryId: "${repositoryId}", name: "${name}", color: "${color}", description: "${description}"}) {
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
