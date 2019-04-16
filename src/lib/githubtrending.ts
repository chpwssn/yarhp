import Axios from "axios";

export interface User {
  username: string;
  href: string;
  avatar: string;
}

export interface TrendingRepo {
  author: string;
  name: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  currentPeriodStars: number;
  buildBy: User[];
}

const githubtrending = {
  getTrending: async (interval: string): Promise<TrendingRepo[]> => {
    return new Promise<TrendingRepo[]>((resolve, reject) => {
      Axios.get(
        `https://github-trending-api.now.sh/repositories?since=${interval}`
      )
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default githubtrending;
