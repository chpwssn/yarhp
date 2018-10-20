import * as React from 'react';
import hackernews from '../lib/hackernews';
import HackerNewsStory from './HackerNewsStory';

interface props {
    type: string,
    limit: number,
    target: boolean
}

interface state {
    stories: number[],
    head: number,
}

class HackerNews extends React.Component<props, state> {

    public constructor(props: props) {
        super(props)
        this.state = {
            stories: [],
            head: 0
        }
    }

    public loadData = async () => {
        return new Promise(async (resolve, reject) => {
            const stories = await hackernews.getStories(this.props.type)
            this.setState({ stories }, () => {
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
            <div className="hn">
                <div className="refresh" onClick={this.loadData}>r</div>
                <div className="stories">
                    <a href="https://news.ycombinator.com">Hacker News</a>
                    {
                        this.state.stories.slice(this.state.head, this.state.head + this.props.limit).map((story, i) => (
                            <HackerNewsStory id={story} index={this.state.head + i} key={story} target={this.props.target} />
                        ))
                    }
                </div>
                <div className="controls">
                    <button className="prev" onClick={this.previous} disabled={this.state.head == 0}>
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
