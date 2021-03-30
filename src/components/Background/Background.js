import React, { useState } from 'react';

import firebase from 'firebase/app';

import defaultBackground from '../../img/default.jpg';
import './Background.css';

function Background() {
  const [backgroundFile, setBackgroundFile] = useState(undefined);
  const [backgroundURL, setBackgroundURL] = useState(undefined);

  const uid = firebase.auth().currentUser.uid;
  const backgroundRef = firebase.storage().ref('backgrounds/' + uid + '/background');

  async function updateBackground(e) {
    e.preventDefault();
    await backgroundRef.put(backgroundFile);
  }

  return (
    <>
      <img
        className="background-img"
        src={defaultBackground}
        alt=""
      />
      <div className="Background widget">
        <h1>Background</h1>
        <form onSubmit={updateBackground}>
          <input
            type="file"
            accept="image/*"
            onChange={e => setBackgroundFile(e.target.files[0])}
            required
            />
          <button type="submit">Update Background</button>
        </form>
      </div>
    </>
  );
}

export default Background;
