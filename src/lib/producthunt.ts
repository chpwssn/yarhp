import Axios from "axios";

export interface OauthTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  created_at: number;
}

export interface User {
  id: number;
  created_at: string;
  username: string;
  headline: string;
  twitter_username: string;
  website_url: string;
  profile_url: string;
  image_url: any;
  name: string;
}

export interface Topic {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  comments_count: number;
  day: string;
  id: number;
  name: string;
  product_state: string;
  tagline: string;
  slug: string;
  ios_featured_at: string;
  votes_count: number;
  category_id: number;
  created_at: string;
  current_user: any;
  discussion_url: string;
  exclusive: any;
  featured: boolean;
  makers: User[];
  platforms: any[];
  redirect_url: string;
  screenshot_url: any;
  thumbnail: any;
  topics: Topic[];
  user: User;
}

export interface PostsResponse {
  posts: Post[];
}

const producthunt = {
  getPosts: async (): Promise<PostsResponse> => {
    return new Promise<PostsResponse>((resolve, reject) => {
      Axios.get(`https://api.producthunt.com/v1/posts`, {
        headers: {
          Authorization:
            "Bearer e6ae3bcdf92706af8ce62ecce94435f0133b00baac8c86961c416acb855e51c1"
        }
      })
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default producthunt;
