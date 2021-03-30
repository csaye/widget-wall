import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';

import defaultBackground from '../../img/default.jpg';
import './Background.css';

function Background() {
  const [backgroundFile, setBackgroundFile] = useState(undefined);
  const [backgroundURL, setBackgroundURL] = useState(undefined);
  const [loaded, setLoaded] = useState(false);

  const uid = firebase.auth().currentUser.uid;
  const backgroundRef = firebase.storage().ref('backgrounds/' + uid + '/background');

  async function updateBackground(e) {
    e.preventDefault();
    await backgroundRef.put(backgroundFile)
    .then(() => getBackgroundURL())
    .catch(e => console.log(e));
  }

  async function getBackgroundURL() {
    // get background url
    await backgroundRef.getDownloadURL()
    .then(bURL => {
      setBackgroundURL(bURL);
      setLoaded(true);
    })
    .catch(e => {
      console.log(e);
      setLoaded(true);
    });
  }

  async function checkBackgroundURL() {
    // if background file exists
    const files = await firebase.storage().ref('backgrounds/' + uid).listAll();
    if (files.items.length > 0) {
      // get background url
      getBackgroundURL();
    // if no file to load, loading done
    } else {
      setLoaded(true);
    }
  }

  // check background URL on start
  useEffect(() => {
    checkBackgroundURL();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="Background">
      <div className="widget">
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
      {
        loaded &&
        <img
          className="background-img"
          src={backgroundURL ? backgroundURL : defaultBackground}
          alt=""
        />
      }
    </div>
  );
}

export default Background;
