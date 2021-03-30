import React, { useState } from 'react';

import './TextCount.css';

function TextCount() {
  const [text, setText] = useState('');

  return (
    <div className="TextCount widget">
      <h1>Text Count</h1>
      <textarea rows="4" value={text} onChange={e => setText(e.target.value)} />
      <p>Word count: {!text ? 0 : text.trim().split(' ').length}</p>
      {console.log(text.trim().split(' '))}
      <p>Character count: {text.length}</p>
    </div>
  )
}

export default TextCount;
