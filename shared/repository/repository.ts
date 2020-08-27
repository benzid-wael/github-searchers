import User from '../user/user';


export default interface Repository {
  name: string;
  repositoryUrl: string,
  createdAt: string,
  forksCount: number,
  openIssuesCount: number,
  watchers: number,
  stars: number,
  author: User;
}