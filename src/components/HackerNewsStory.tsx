import * as React from 'react';
import hackernews, {Story} from '../lib/hackernews';
import * as moment from 'moment';

interface props {
    id: number
}

interface state {
    story: Story
}

class HackerNewsStory extends React.Component<props, state> {

  public componentDidMount = async () => {
    this.setState({story: await hackernews.getStory(this.props.id)})
  }

  public render() {
    return (
      <div className="hn-story">
        {this.state ? (
          <div className="link">
            <div className="title">
              <a href={this.state.story.url} target="_blank" >{this.state.story.title}</a>
            </div>
            <div className="details">
              {this.state.story.score} by <a href={`https://news.ycombinator.com/user?id=${this.state.story.by}`} target="_blank">{this.state.story.by}</a> {moment.unix(this.state.story.time).fromNow()} | <a href={`https://news.ycombinator.com/item?id=${this.state.story.id}`} target="_blank">{this.state.story.descendants} comments</a>
            </div>
          </div>
        ): "Loading..."}
      </div>
    );
  }
}

export default HackerNewsStory;
