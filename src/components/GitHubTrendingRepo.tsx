import * as React from 'react';
// import * as moment from 'moment';
import { TrendingRepo } from '../lib/githubtrending';

interface props {
  target: boolean,
  index: number,
  repo: TrendingRepo
}

interface state {
}

class GitHubTrendingRepo extends React.Component<props, state> {

  public componentDidMount = async () => {
  }

  public render() {
    return (
      <div className="githubtrending-repo">
        <div className="link">
          <div className="title">
            <span className="index">{this.props.index + 1}</span> <a href={this.props.repo.url} target={this.props.target ? "_blank" : ""} >{this.props.repo.author}/{this.props.repo.name}</a>
          </div>
          <div className="details">
            {this.props.repo.description}
          </div>
        </div>
      </div>
    );
  }
}

export default GitHubTrendingRepo;
