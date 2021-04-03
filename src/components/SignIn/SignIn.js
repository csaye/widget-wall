import firebase from 'firebase/app';

import BackgroundImage from '../BackgroundImage/BackgroundImage.js';

import defaultBackground from '../../img/default.jpg';
import './SignIn.css';

function SignIn() {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  return (
    <>
      <div className="SignIn widget">
        <h1>Widget Wall</h1>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
      <BackgroundImage src={defaultBackground} />
    </>
  );
}

export default SignIn;
