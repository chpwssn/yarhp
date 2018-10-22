import * as React from 'react';
import hackernews, { Story } from '../lib/hackernews';
import * as moment from 'moment';

interface props {
  id: number,
  index: number,
  target: boolean,
}

interface state {
  story: Story
}

interface HackerNewsStory extends React.Component<props, state>{
    domainRegExp: RegExp
}

class HackerNewsStory extends React.Component<props, state> {

  constructor(props: props) {
    super(props);
    this.domainRegExp = new RegExp(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img)
  }

  public componentDidMount = async () => {
    this.setState({ story: await hackernews.getStory(this.props.id) })
  }

  private domainFromLink = (link: string): string | null => {
      let match = this.domainRegExp.exec(link);
      return match ? match[1] : null;
  }

  private discussLink = (): string => {
    return `https://news.ycombinator.com/item?id=${this.state.story.id}`;
  }

  private storyLink = (): string => {
    return this.state.story.url ? this.state.story.url : this.discussLink();
  }

  private userLink = (): string => {
    return `https://news.ycombinator.com/user?id=${this.state.story.by}`;
  }

  public render() {
    return (
      <div className="hn-story story">
        {this.state ? (
          <div className="link">
            <div className="title">
              <span className="index">{this.props.index + 1}</span> <a href={this.storyLink()} target={this.props.target ? "_blank" : ""} >{this.state.story.title} {
                this.state.story.url ? (
                  <span className="domain">({this.domainFromLink(this.state.story.url)})</span>
                ) : null
              }</a>
            </div>
            <div className="details">
              {this.state.story.score} by <a href={this.userLink()} target={this.props.target ? "_blank" : ""}>{this.state.story.by}</a> {moment.unix(this.state.story.time).fromNow()} | <a href={this.discussLink()} target="_blank">{this.state.story.descendants} comments</a>
            </div>
          </div>
        ) : "Loading..."}
      </div>
    );
  }
}

export default HackerNewsStory;
