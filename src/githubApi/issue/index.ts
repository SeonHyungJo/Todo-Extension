import { REPOSITORY_ID, TODO_ID, Config, Todo } from '@/model';

export const createIssueQuery = (
  repositoryId: REPOSITORY_ID,
  { title, body, labelList = [] }: Todo,
): string => {
  const labelIds = labelList.map(item => {
    return item.id;
  });

  return `
  mutation {
    createIssue(input: {
      repositoryId: "${repositoryId}",
      title: "${title}",
      body: "${body}",
      labelIds: ${JSON.stringify(labelIds)}
    }) {
      issue {
        updatedAt
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
  `;
};

export const getIssueQuery = ({ owner, repoName }: Config): string => `
  query {
    repository(name: "${repoName}", owner: "${owner}") {
      issues(first: 20, states: OPEN) {
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

export const updateIssueQuery = ({ id, title, body }: Todo): string => `
  mutation {
    updateIssue(input: {id: "${id}", body: "${body}", title: "${title}"}) {
      issue {
        updatedAt
        title
        id
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
`;

export const deleteIssueQuery = (id: TODO_ID): string => `
  mutation {
    closeIssue(input: {issueId: "${id}"}) {
      issue {
        id
      }
    }
  }
`;
