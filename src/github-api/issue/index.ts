import { REPOSITORY_ID, TODO_ID, Config, Todo } from '@model/index';

// Create
const createIssueQuery = (
  repositoryId: REPOSITORY_ID,
  { title, body, labelList = [] }: Todo,
): string => {
  const labelIds = labelList.map(item => {
    return item.ID;
  });

  return `
  mutation {
    createIssue(input: {repositoryId: "${repositoryId}", title: "${title}", body: "${body}", labelIds: "${labelIds}}) {
      issue {
        id
      }
    }
  }
  `;
};

// Read
const getIssueQuery = ({ owner, repositoryName }: Config): string => {
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
const updateIssueQuery = (
  repositoryId: REPOSITORY_ID,
  { title, body }: Todo,
): string => {
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
const deleteIssueQuery = (ID: TODO_ID): string => {
  return `
  mutation {
    closeIssue(input: {issueId: "${ID}"}) {
      issue {
        id
      }
    }
  }
  `;
};

export { createIssueQuery, getIssueQuery, updateIssueQuery, deleteIssueQuery };
