import { DefaultConfig } from '@model/index';

// Read Repo Id
export const getRepoId = ({ repositoryName, owner }: DefaultConfig): string => {
  return `{
    repository(name: "${repositoryName}", owner: "${owner}") {
      id
    }
  }`;
};
