import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from '../../util/firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';

import Time from '../Time/Time.js';
import CoinFlip from '../CoinFlip/CoinFlip.js';
import DiceRoll from '../DiceRoll/DiceRoll.js';
import SignIn from '../SignIn/SignIn.js';
import SignOut from '../SignOut/SignOut.js';

import './App.css';

firebase.initializeApp(firebaseConfig);

function App() {
  useAuthState(firebase.auth());

  return (
    <div className="App">
      <div className="widgets">
      {
        firebase.auth().currentUser ?
        <>
          <SignOut />
          <Time />
          <CoinFlip />
          <DiceRoll />
        </> :
        <SignIn />
      }
      </div>
    </div>
  );
}

export default App;
