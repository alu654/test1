import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NoteForm from './notes/NoteForm';
import NoteList from './notes/NoteList';
import EditNote from './notes/EditNote'; 

function App() {
  const [backendUrl, setBackendUrl] = useState('');

  const handleSaveUrl = (url) => {
    setBackendUrl(url);
  };

  const handleNoteSubmit = (newNote) => {
    console.log('Note submitted:', newNote);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/notes" />} />
        <Route path="/createNote" element={<NoteForm onSubmit={handleNoteSubmit} backendUrl={backendUrl} />} />
        <Route path="/notes" element={<NoteList backendUrl={backendUrl} />} />
        <Route path="/editNote/:noteId" element={<EditNote />} /> 
      </Routes>
    </Router>
  );
}

export default App;
