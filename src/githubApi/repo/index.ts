import { Config } from '@/model';

// Read Repo Id
export const getRepoId = ({ repositoryName, owner }: Config): string => {
  return `query {
    repository(name: "${repositoryName}", owner: "${owner}") {
      id
    }
  }`;
};
