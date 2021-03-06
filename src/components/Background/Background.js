import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';

import BackgroundImage from '../BackgroundImage/BackgroundImage.js';

import defaultBackground from '../../img/default.jpg';
import './Background.css';

function Background() {
  const [backgroundFile, setBackgroundFile] = useState(undefined);
  const [backgroundURL, setBackgroundURL] = useState(undefined);;

  const [loaded, setLoaded] = useState(false)
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const uid = firebase.auth().currentUser.uid;
  const backgroundRef = firebase.storage().ref('backgrounds/' + uid + '/background');

  async function updateBackground(e) {
    e.preventDefault();
    setSuccess('');
    setError('');
    await backgroundRef.put(backgroundFile)
    .then(() => {
      setSuccess('Background successfully updated.');
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      getBackgroundURL();
    })
    .catch(e => {
      setError('Please upload an image with a file size under 5MB.')
      setTimeout(() => {
        setError('');
      }, 3000);
    });
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
    const files = await firebase.storage().ref('backgrounds/' + uid).listAll();
    // get background url if file exists
    if (files.items.length > 0) getBackgroundURL();
    // if no file to load, loading done
    else setLoaded(true);
  }

  // check background URL on start
  useEffect(() => {
    checkBackgroundURL();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
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
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
      </div>
      {
        loaded &&
        <BackgroundImage src={backgroundURL ? backgroundURL : defaultBackground} />
      }
    </>
  );
}

export default Background;
