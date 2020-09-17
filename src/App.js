import React, {useState} from 'react';
import {AnchorButton} from '@blueprintjs/core';

import ResultTxt from './components/ResultTextArea';
import Editor from './components/Editor';

function App() {
  const [text, setText] = useState('<i>This is a test text</i>');

  return (
    <div className="App">
      {/* <ResultTxt value={text} /> */}
      <Editor value={text} onChange={(val) => setText(val)} />
    </div>
  );
}

export default App;
