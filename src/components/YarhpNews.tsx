import * as React from 'react';
interface props {

}

interface state {

}

class YarhpNews extends React.Component<props, state> {

    public constructor(props: props) {
        super(props)
        this.state = {
        }
    }

    public render() {
        return (
            <div className="yarhp-news">
               Yarhp News! <a href="https://beta.yarhp.com">Beta versions of Yarhp now available at beta.yarhp.com!</a>
            </div>
        );
    }
}

export default YarhpNews;
