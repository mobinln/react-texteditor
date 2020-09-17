import React from 'react';
import {Button} from '@blueprintjs/core';

export const EditSwitch = (props) => {
    return(
        <Button icon={props.icon} style={{margin:'0 5px'}} active={props.active} intent={props.intent} onClick={props.onClick} />
    );
}