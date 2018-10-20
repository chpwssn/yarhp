import * as React from 'react';
import './App.css';
import HackerNews from './components/HackerNews';
import { StoryTypes } from './lib/hackernews';
import Configuration from './components/Configuration';

interface props {
}

interface state {
  target: boolean
}

class App extends React.Component<props, state> {

  public constructor(props: props) {
    super(props)
    this.state = {
      target: true
    }
  }
  public componentDidMount = async () => {
  }

  public setTarget = (target: boolean) => {
    this.setState({target})
  }

  public render() {
    return (
      <div className="app">
        <div className="tl">
          <HackerNews type={StoryTypes.Top} limit={10} target={this.state.target} />
        </div>
        <div className="configuration">
          <Configuration target={this.state.target} updateTarget={this.setTarget}/>
        </div>
        <div className="about">
          <a href="https://github.com/chpwssn/yarhp">GitHub</a> | No terms of service, no privacy policy, no one should use this app.
        </div>
      </div>
    );
  }
}

export default App;
