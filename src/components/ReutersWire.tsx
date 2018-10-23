import * as React from 'react';
import reuterswire, { WireItem, WireResponse } from '../lib/reuterswire';
import Experimental from './Experimental';
import Unofficial from './Unofficial';
import ReutersWireStory from './ReutersWireStory';
import Loading from 'src/elements/Loading';

interface props {
    limit: number,
    target: boolean
}

interface state {
    posts: WireItem[],
    head: number,
    firstLoadComplete: boolean
}

class ReutersWire extends React.Component<props, state> {

    public constructor(props: props) {
        super(props)
        this.state = {
            posts: [],
            head: 0,
            firstLoadComplete: false
        }
    }

    public loadData = async () => {
        return new Promise(async (resolve, reject) => {
            const response: WireResponse = await reuterswire.getStories()
            let stories: WireItem[] = [];
            response.wireitems.forEach(item => {
                if (item.wireitem_type == "story") {
                    stories.push(item)
                }
            })
            this.setState({ posts: stories, firstLoadComplete: true }, () => {
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
            <div className="producthunt site">
                <div className="refresh" onClick={this.loadData}>r</div>
                <div className="stories">
                    <a href="https://www.reuters.com/theWire">Reuters Wire <Experimental /> <Unofficial /></a>
                    {
                        this.state.firstLoadComplete ? (
                            this.state.posts.slice(this.state.head, this.state.head + this.props.limit).map((post, i) => (
                                <ReutersWireStory story={post} index={this.state.head + i} key={this.state.head + i} target={this.props.target} />
                            ))
                        ) : <Loading />
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

export default ReutersWire;
