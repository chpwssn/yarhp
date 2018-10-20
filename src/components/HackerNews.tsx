import * as React from 'react';
import hackernews from '../lib/hackernews';
import HackerNewsStory from './HackerNewsStory';

interface props {
    type: string,
    limit: number
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

    public componentDidMount = async () => {
        const stories = await hackernews.getStories(this.props.type)
        this.setState({ stories })
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
                <div className="stories">
                    <a href="https://news.ycombinator.com">Hacker News</a>
                    {
                        this.state.stories.slice(this.state.head, this.state.head + this.props.limit).map(story => (
                            <HackerNewsStory id={story} key={story} />
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
