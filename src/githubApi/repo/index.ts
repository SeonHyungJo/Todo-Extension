import { Config } from '@/model';

export const getRepoId = ({ repositoryName, owner }: Config): string => `
  query {
    repository(name: "${repositoryName}", owner: "${owner}") {
      id
    }
  }
`;
