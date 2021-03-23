import firebase from 'firebase/app';

import React, { useState, useEffect } from 'react';

import './Notepad.css';

function Notepad() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const uid = firebase.auth().currentUser.uid;

  async function getNote() {
    const noteRef = firebase.firestore().collection('notes').doc(uid);
    noteRef.get().then(doc => {
      if (doc.exists) setNote(doc.data().note);
    })
  }

  useEffect(() => {
    getNote();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function saveNote() {
    firebase.firestore().collection('notes').doc(uid).set({
      note
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false)
    }, 2000);
  }

  return (
    <div className="Notepad widget">
      <h1>Notepad</h1>
      <textarea rows="6" value={note} onChange={e => setNote(e.target.value)} />
      <button onClick={saveNote}>Save Note</button>
      {saved && <p className="success">Note saved</p>}
    </div>
  );
}

export default Notepad;
