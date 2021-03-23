import firebase from 'firebase/app';

import './SignOut.css';

function SignOut() {
  return (
    <div className="SignOut widget">
      <p>Signed in as {firebase.auth().currentUser.displayName}</p>
      <img src={firebase.auth().currentUser.photoURL} alt="" />
      <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
    </div>
  );
}

export default SignOut;
