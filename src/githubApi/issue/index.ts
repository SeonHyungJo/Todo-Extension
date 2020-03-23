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
    createIssue(input: {repositoryId: "${repositoryId}", title: "${title}", body: "${body}", labelIds: "${labelIds}}) {
      issue {
        id
      }
    }
  }
  `;
};

export const getIssueQuery = ({ owner, repositoryName }: Config): string => `
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

export const updateIssueQuery = (
  repositoryId: REPOSITORY_ID,
  { title, body }: Todo,
): string => `
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

export const deleteIssueQuery = (id: TODO_ID): string => `
  mutation {
    closeIssue(input: {issueId: "${id}"}) {
      issue {
        id
      }
    }
  }
`;
