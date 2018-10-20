import * as React from 'react';
import * as moment from 'moment';
import { WireItem } from 'src/lib/reuterswire';

interface props {
  index: number,
  target: boolean,
  story: WireItem
}

interface state {
}

class ReutersWireStory extends React.Component<props, state> {

  public componentDidMount = async () => {
  }

  public render() {
    const story = this.props.story.templates[0].story;
    return (
      <div className="reuters-story">
        <div className="link">
          <div className="title">
            <span className="index">{this.props.index + 1}</span> <a href={story.url} target={this.props.target ? "_blank" : ""} >{story.hed}</a>
          </div>
          <div className="details">
            Updated {moment(story.updated_at).fromNow()} {story.dateline}
          </div>
        </div>
      </div>
    );
  }
}

export default ReutersWireStory;
