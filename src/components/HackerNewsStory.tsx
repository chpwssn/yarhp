import * as React from 'react';
import hackernews, {Story} from '../lib/hackernews';

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
        <p className="title">
            {this.state ? (
                <a href={this.state.story.url} target="_blank" >{this.state.story.title}</a>
                
            ): "Loading..."}
        </p>
      </div>
    );
  }
}

export default HackerNewsStory;
