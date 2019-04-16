import * as React from "react";
import moment from "moment";
import { Post } from "../lib/producthunt";

interface props {
  index: number;
  target: boolean;
  post: Post;
}

interface state {}

class ProductHuntPost extends React.Component<props, state> {
  public componentDidMount = async () => {};

  public render() {
    return (
      <div className="producthunt-story story">
        <div className="link">
          <div className="title">
            <span className="index">{this.props.index + 1}</span>{" "}
            <a
              href={this.props.post.redirect_url}
              target={this.props.target ? "_blank" : ""}
            >
              {this.props.post.name} | {this.props.post.tagline}
            </a>
          </div>
          <div className="details">
            {this.props.post.votes_count} votes, created{" "}
            {moment(this.props.post.created_at).fromNow()} by{" "}
            <a href={this.props.post.user.profile_url} target="_blank">
              {this.props.post.user.username}
            </a>{" "}
            |{" "}
            <a
              href={this.props.post.discussion_url}
              target={this.props.target ? "_blank" : ""}
            >
              discussion
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductHuntPost;
