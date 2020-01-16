import { Config } from '@model/index';

//todo Create
const createIssueQuery = (
  repositoryId: string,
  title: string,
  body: string,
) => {
  return `
  mutation {
    __typename
    createIssue(input: {repositoryId: "${repositoryId}", title: "${title}", body: "${body}"}) {
      issue {
        id
        createdAt
        bodyHTML
      }
    }
  }
  `;
};

//todo Read
const getIssueQuery = ({ repoName, owner }: Config) => {
  return `
  query {
    repository(name: "${repoName}", owner: "${owner}") {
      issues(first: 10, states: OPEN) {
        edges {
          node {
            id
            title
            bodyHTML
            labels(first: 10) {
              edges {
                node {
                  id
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  }
  `;
};

//todo Update
const updateIssueQuery = (
  repositoryId: string,
  title: string,
  body: string,
) => {
  return `
  mutation {
    updateIssue(input: {id: "MDU6SXNzdWU1NDg3MzM4MjM", body: "${body}"}) {
      issue {
        updatedAt
        title
        id
        bodyHTML
      }
    }
  }
  `;
};

//todo Delete
const deleteIssueQuery = () => {};

export { createIssueQuery, getIssueQuery, updateIssueQuery, deleteIssueQuery };
