import { Config, Todo } from '@model/index';

//todo Create
const createIssueQuery = ({ repositoryId, title, body }: Todo): string => {
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
const getIssueQuery = ({
  token,
  repositoryId,
  owner,
  repositoryName,
}: Config): string => {
  return `
  query {
    repository(name: "${repositoryName}", owner: "${owner}") {
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
const updateIssueQuery = ({ repositoryId, title, body }: Todo): string => {
  return `
  mutation {
    updateIssue(input: {id: "${repositoryId}", body: "${body}", title: "${title}}) {
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
const deleteIssueQuery = (ID: string): string => {
  return `
  mutation MyMutation {
    __typename
    closeIssue(input: {issueId: "${ID}"}) {
      issue {
        id
      }
    }
  }  
  `;
};

export { createIssueQuery, getIssueQuery, updateIssueQuery, deleteIssueQuery };
