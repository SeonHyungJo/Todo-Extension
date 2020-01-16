//todo Create
const createIssueQuery = (
  repositoryId: String,
  title: String,
  body: String,
) => {
  return;
  `
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
const getIssueQuery = (repoName: String, owner: String) => {
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
const updateIssueQuery = () => {};

//todo Delete
const deleteIssueQuery = () => {};

export { createIssueQuery, getIssueQuery, updateIssueQuery, deleteIssueQuery };
