import * as React from 'react';
import './App.css';
import HackerNews from './components/HackerNews';
import GitHubTrending from './components/GitHubTrending';
import { StoryTypes } from './lib/hackernews';
import Configuration from './components/Configuration';
import update from 'immutability-helper';
import ProductHunt from './components/ProductHunt';

interface props {
}

interface options {
  version: number,
  target_new_tabs: boolean,
  hacker_news: boolean,
  github_trending: string,
}

interface state {
  options: options
}

class App extends React.Component<props, state> {

  public constructor(props: props) {
    super(props)
    this.state = {
      options: {
        version: 1,
        target_new_tabs: false,
        hacker_news: true,
        github_trending: "week"
      }
    }
  }
  public componentDidMount = async () => {
    const lsOptions = localStorage.getItem('allOptions')
    if (lsOptions !== null) {
      this.setState({ options: JSON.parse(lsOptions) })
    }
  }

  public setTarget = (target: boolean) => {
    this.setState({ options: update(this.state.options, { target_new_tabs: { $set: target } }) }, () => {
      this.saveOptions()
    })
  }

  public saveOptions = () => {
    localStorage.setItem('allOptions', JSON.stringify(this.state.options))
  }

  public render() {
    return (
      <div className="app">
        <div className="tl">
          <HackerNews type={StoryTypes.Top} limit={10} target={this.state.options.target_new_tabs} />
        </div>
        <div className="tr">
          <GitHubTrending limit={10} target={this.state.options.target_new_tabs} interval={this.state.options.github_trending} />
        </div>
        <div className="bl">
          <ProductHunt limit={10} target={this.state.options.target_new_tabs} />
        </div>
        <div className="configuration">
          <Configuration target={this.state.options.target_new_tabs} updateTarget={this.setTarget} />
        </div>
        <div className="about">
          <a href="https://github.com/chpwssn/yarhp">yarhp on GitHub</a> | No terms of service, no privacy policy, no one should use this app.
        </div>
      </div>
    );
  }
}

export default App;
