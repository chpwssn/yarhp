import * as React from 'react';

interface props {
    target: boolean
    updateTarget: Function,
}

interface state {

}

class Configuration extends React.Component<props, state> {

    public constructor(props: props) {
        super(props)
        this.state = {
        }
    }

    public setTarget = (e: any) => {
        this.props.updateTarget(e.target.checked)
    }

    public render() {
        return (
            <div className="configuration">
                <label htmlFor="target">Open in new tabs:</label>
                <input type="checkbox" id="target" checked={this.props.target} defaultChecked={this.props.target} onClick={this.setTarget}></input>
            </div>
        );
    }
}

export default Configuration;
