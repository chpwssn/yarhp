import * as React from 'react';
import './NotFound.css';

interface NotFoundProps {
    text: string,
    refreshEvent: (event: any) => void
}

const NotFound = (props: NotFoundProps) => (
    <div className="notfound" onClick={props.refreshEvent} title="The stories, posts or elements for this site were not found.">
        {props.text}
    </div>
)
export default NotFound;

export {
    NotFoundProps
};