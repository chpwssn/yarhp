import * as React from 'react';
import './App.css';
import HackerNews from './components/HackerNews';
import GitHubTrending from './components/GitHubTrending';
import { StoryTypes } from './lib/hackernews';
import Configuration from './components/Configuration';
import ProductHunt from './components/ProductHunt';
import ReutersWire from './components/ReutersWire';

interface props {
}

interface options {
  version: number,
  target_new_tabs: boolean,
  hacker_news: boolean,
  github_trending: string,
}

interface state {
  options?: options
}

class App extends React.Component<props, state> {

  public constructor(props: props) {
    super(props)
    this.state = {
    }
  }
  public componentDidMount = async () => {
    const lsOptions = localStorage.getItem('allOptions')
    if (lsOptions !== null) {
      const parsedOptions: options = JSON.parse(lsOptions);
      // Legacy migrations
      if (parsedOptions.github_trending === "week") parsedOptions.github_trending = "weekly";
      this.setState({ options: parsedOptions })
    } else {
      const defaultOptions: options = {
        version: 1,
        target_new_tabs: false,
        hacker_news: true,
        github_trending: "weekly"
      };
      this.setState({ options: defaultOptions })
    }
  }

  public updateOptions = async (options: options) => {
    return new Promise((resolve, reject) => {
      this.setState({ options }, () => {
        this.saveOptions();
        resolve(true);
      })
    })
  }

  public saveOptions = () => {
    localStorage.setItem('allOptions', JSON.stringify(this.state.options))
  }

  public render() {
    return (
      <div className="app">
        {this.state.options ? (
          <div className="container">
            <div className="tl">
              <HackerNews type={StoryTypes.Top} limit={10} target={this.state.options.target_new_tabs} />
            </div>
            <div className="tr">
              <GitHubTrending limit={10} target={this.state.options.target_new_tabs} interval={this.state.options.github_trending} />
            </div>
            <div className="bl">
              <ProductHunt limit={10} target={this.state.options.target_new_tabs} />
            </div>
            <div className="br">
              <ReutersWire limit={10} target={this.state.options.target_new_tabs} />
            </div>
            <div className="configuration">
              <Configuration options={this.state.options} updateOptions={this.updateOptions} />
            </div>
            <div className="about">
              <a href="https://github.com/chpwssn/yarhp">yarhp on GitHub</a> | No terms of service, no privacy policy, no one should use this app.
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;

export {
  options
};
