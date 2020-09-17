import React from 'react';
import {TextArea} from '@blueprintjs/core'; 

export default function ResultTextArea(props) {
    // {props.value}
    // console.log(props.value);
    return(
        <div className='ResultText'>
            {props.value}
        </div>
    );
}