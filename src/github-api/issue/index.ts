import { Config, UpdateIssueParams } from '@model/index';

//todo Create
const createIssueQuery = (
  repositoryId: string,
  title: string,
  body: string,
): string => {
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
const getIssueQuery = ({ repoName, owner }: Config): string => {
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
const updateIssueQuery = ({
  repositoryId,
  body,
  title,
}: UpdateIssueParams): string => {
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
const deleteIssueQuery = (issueId: string): string => {
  return `
  mutation MyMutation {
    __typename
    closeIssue(input: {issueId: "${issueId}"}) {
      issue {
        id
      }
    }
  }  
  `;
};

export { createIssueQuery, getIssueQuery, updateIssueQuery, deleteIssueQuery };
