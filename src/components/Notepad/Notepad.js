import firebase from 'firebase/app';

import React, { useState, useEffect } from 'react';

import './Notepad.css';

function Notepad() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const uid = firebase.auth().currentUser.uid;
  const notepadRef = firebase.firestore().collection('notepad').doc(uid);

  async function getNote() {
    notepadRef.get().then(doc => {
      if (doc.exists) {
        const docData = doc.data();
        setNote(docData.note);
      }
    });
  }

  useEffect(() => {
    // get note on start
    getNote();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function saveNote(e) {
    e.preventDefault();
    // update firebase
    notepadRef.set({
      note: note
    });
    // show saved message with timeout
    setSaved(true);
    setTimeout(() => {
      setSaved(false)
    }, 2000);
  }

  return (
    <div className="Notepad widget">
      <h1>Notepad</h1>
      <form onSubmit={saveNote}>
        <textarea rows="6" value={note} onChange={e => setNote(e.target.value)} />
        <button type="submit">Save Note</button>
      </form>
      {saved && <p className="success">Note saved</p>}
    </div>
  );
}

export default Notepad;
