import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from '../../util/firebaseConfig.js';
import { useAuthState } from 'react-firebase-hooks/auth';

import Time from '../Time/Time.js';
import CoinFlip from '../CoinFlip/CoinFlip.js';
import DiceRoll from '../DiceRoll/DiceRoll.js';

import './App.css';

firebase.initializeApp(firebaseConfig);

function App() {
  useAuthState(firebase.auth());

  return (
    <div className="App">
      <Time />
      <CoinFlip />
      <DiceRoll />
    </div>
  );
}

export default App;
