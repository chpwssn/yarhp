import * as React from 'react';
import githubtrending, { TrendingRepo } from '../lib/githubtrending';
// import GitHubTrendingRepo from './GitHubTrendingRepo';

interface props {
    limit: number,
    interval: string,
    target: boolean
}

interface state {
    repos: TrendingRepo[],
    head: number,
}

class GitHubTrending extends React.Component<props, state> {

    public constructor(props: props) {
        super(props)
        this.state = {
            repos: [],
            head: 0
        }
    }

    public loadData = async () => {
        console.log(this.props.interval)
        return new Promise(async (resolve, reject) => {
            const repos = await githubtrending.getTrending(this.props.interval)
            this.setState({ repos }, () => {
                resolve()
            })
        })
    }

    public componentDidMount = async () => {
        await this.loadData()
    }

    public next = () => {
        this.setState({ head: this.state.head + this.props.limit });
    }

    public previous = () => {
        let prev = this.state.head - this.props.limit;
        if (prev < 0) prev = 0
        this.setState({ head: prev })
    }

    public render() {
        return (
            <div className="githubtrending site">
                <div className="refresh" onClick={this.loadData}>r</div>
                <div className="stories">
                    <a href="https://github.com/trending">GitHub Trending</a>
                    {/* {
                        this.state.repos.slice(this.state.head, this.state.head + this.props.limit).map((repo, i) => (
                            <GitHubTrendingRepo repo={repo} index={this.state.head + i} key={this.state.head + i} target={this.props.target} />
                        ))
                    } */}
                    <p>GitHub trending is currently unavailable.</p>
                </div>
                {/* <div className="controls">
                    <button className="prev" onClick={this.previous} disabled={this.state.head == 0}>
                        Previous
                    </button>
                    <button className="next" onClick={this.next}>
                        Next
                </button>
                </div> */}
            </div>
        );
    }
}

export default GitHubTrending;
