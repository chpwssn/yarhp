import * as React from 'react';
import './App.css';
import hackernews, { StoryTypes } from './lib/hackernews';
import HackerNewsStory from './components/HackerNewsStory';

interface props {

}

interface state {
  stories: number[]
}

class App extends React.Component<props, state> {

  public constructor(props: props) {
    super(props)
    this.state = {stories: []}
  }
  public componentDidMount = async () => {
    const stories = await hackernews.getStories(StoryTypes.Top)
    this.setState({stories})
  }
  public render() {
    return (
      <div className="App">
        <div className="hn-stories">
          Hacker News
          {
            this.state.stories.map(story => (
              <HackerNewsStory id={story} key={story}/>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
