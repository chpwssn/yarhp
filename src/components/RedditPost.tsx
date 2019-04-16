import * as React from "react";
import * as moment from "moment";
import { RedditObject } from "../lib/redditbasic";

interface props {
  index: number;
  target: boolean;
  story: RedditObject;
}

interface state {}

class RedditPost extends React.Component<props, state> {
  public componentDidMount = async () => {};

  public render() {
    const post = this.props.story.data;
    return (
      <div className="reddit-story story">
        <div className="link">
          <div className="title">
            <span className="index">{this.props.index + 1}</span>{" "}
            <a href={post.url} target={this.props.target ? "_blank" : ""}>
              {post.title}
            </a>{" "}
            <span className="domain">{post.subreddit_name_prefixed}</span>
          </div>
          <div className="details">
            Posted {moment.unix(post.created).fromNow()} by {post.author} |{" "}
            <a
              href={`https://reddit.com${post.permalink}`}
              target={this.props.target ? "_blank" : ""}
            >
              {post.num_comments} comments
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default RedditPost;
