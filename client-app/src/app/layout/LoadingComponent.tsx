import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
    inverted?: boolean; //make the background darker or lighter
    content?: string;
}

export default function LoadingComponent({inverted = true, content = 'Loading....'}: Props) {
    //Return JSX from sementic UI
    return(
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}