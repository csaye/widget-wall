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
import Color from '../Color/Color.js';
import Notepad from '../Notepad/Notepad.js';
import BaseConvert from '../BaseConvert/BaseConvert.js';
import TempConvert from '../TempConvert/TempConvert.js';
import DistConvert from '../DistConvert/DistConvert.js';
import Stopwatch from '../Stopwatch/Stopwatch.js';
import Timer from '../Timer/Timer.js';
import CaesarShift from '../CaesarShift/CaesarShift.js';
import MorseCode from '../MorseCode/MorseCode.js';
import Calculator from '../Calculator/Calculator.js';
import PrimeCheck from '../PrimeCheck/PrimeCheck.js';
import RockPaperScissors from '../RockPaperScissors/RockPaperScissors.js';

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
          <Color />
          <Notepad />
          <BaseConvert />
          <TempConvert />
          <DistConvert />
          <Stopwatch />
          <Timer />
          <CaesarShift />
          <MorseCode/>
          <Calculator />
          <PrimeCheck />
          <RockPaperScissors />
        </> :
        <SignIn />
      }
      </div>
    </div>
  );
}

export default App;
