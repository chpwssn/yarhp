import * as React from "react";
import producthunt, { Post, PostsResponse } from "../lib/producthunt";
import ProductHuntPost from "./ProductHuntPost";
import Experimental from "./Experimental";
import ClickToLoad from "../elements/ClickToLoad";

interface props {
  limit: number;
  target: boolean;
}

interface state {
  posts: Post[];
  head: number;
  firstLoadComplete: boolean;
}

class ProductHunt extends React.Component<props, state> {
  public constructor(props: props) {
    super(props);
    this.state = {
      posts: [],
      head: 0,
      firstLoadComplete: false
    };
  }

  public loadData = async () => {
    return new Promise(async (resolve, reject) => {
      const response: PostsResponse = await producthunt.getPosts();
      this.setState({ posts: response.posts, firstLoadComplete: true }, () => {
        resolve();
      });
    });
  };

  public componentDidMount = async () => {};

  public next = () => {
    this.setState({ head: this.state.head + this.props.limit });
  };

  public previous = () => {
    let prev = this.state.head - this.props.limit;
    if (prev < 0) prev = 0;
    this.setState({ head: prev });
  };

  public render() {
    return (
      <div className="producthunt site">
        <div className="refresh" onClick={this.loadData}>
          r
        </div>
        <div className="stories">
          <a href="https://www.producthunt.com">
            Product Hunt <Experimental />
          </a>
          {this.state.firstLoadComplete ? (
            this.state.posts
              .slice(this.state.head, this.state.head + this.props.limit)
              .map((post, i) => (
                <ProductHuntPost
                  post={post}
                  index={this.state.head + i}
                  key={this.state.head + i}
                  target={this.props.target}
                />
              ))
          ) : (
            <ClickToLoad onClick={this.loadData} />
          )}
        </div>
        <div className="controls">
          <button
            className="prev"
            onClick={this.previous}
            disabled={this.state.head == 0}
          >
            Previous
          </button>
          <button className="next" onClick={this.next}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default ProductHunt;
