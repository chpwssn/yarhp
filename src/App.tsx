import * as React from 'react';
import './App.css';
import HackerNews from './components/HackerNews';
import { StoryTypes } from './lib/hackernews';

interface props {
}

interface state {
}

class App extends React.Component<props, state> {

  public constructor(props: props) {
    super(props)
    this.state = {}
  }
  public componentDidMount = async () => {
  }
  public render() {
    return (
      <div className="app">
        <HackerNews type={StoryTypes.Top} limit={10}/>
      </div>
    );
  }
}

export default App;
