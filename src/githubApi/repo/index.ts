import { IUserLoginParam } from '@/redux/auth';

export const getRepoId = ({ repoName, owner }: IUserLoginParam): string => `
  query {
    repository(name: "${repoName}", owner: "${owner}") {
      id
    }
  }
`;
