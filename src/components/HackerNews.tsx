import * as React from "react";
import hackernews from "../lib/hackernews";
import HackerNewsStory from "./HackerNewsStory";
import Loading from "src/elements/Loading";

interface props {
  type: string;
  limit: number;
  target: boolean;
}

interface state {
  stories: number[];
  head: number;
  firstLoadComplete: boolean;
  mutedStories: number[];
}

class HackerNews extends React.Component<props, state> {
  public constructor(props: props) {
    super(props);
    this.state = {
      stories: [],
      head: 0,
      firstLoadComplete: false,
      mutedStories: []
    };
  }

  public loadData = async () => {
    return new Promise(async (resolve, reject) => {
      let stories = await hackernews.getStories(this.props.type);
      stories = stories.filter((story: number) => {
        return this.state.mutedStories.indexOf(story) == -1;
      });
      this.setState({ stories, firstLoadComplete: true }, () => {
        resolve();
      });
    });
  };

  public loadMuted = async () => {
    return new Promise(async (resolve, reject) => {
      const muted = localStorage.getItem("hn_muted");
      const mutedParsed =
        muted && muted != "" ? (JSON.parse(muted) as number[]) : [];
      this.setState(
        {
          mutedStories: mutedParsed
        },
        () => resolve()
      );
    });
  };

  public componentDidMount = async () => {
    await this.loadMuted();
    await this.loadData();
  };

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
      <div className="hn site">
        <div className="refresh" onClick={this.loadData}>
          r
        </div>
        <div className="stories">
          <a href="https://news.ycombinator.com">Hacker News</a>
          {this.state.firstLoadComplete ? (
            this.state.stories
              .slice(this.state.head, this.state.head + this.props.limit)
              .map((story, i) => (
                <HackerNewsStory
                  id={story}
                  index={this.state.head + i}
                  key={story}
                  target={this.props.target}
                />
              ))
          ) : (
            <Loading />
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

export default HackerNews;
