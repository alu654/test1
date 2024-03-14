import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NoteList.css';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [showArchived, setShowArchived] = useState(false); 
  const [categoryFilter, setCategoryFilter] = useState(''); 

  
  useEffect(() => {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  const handleNoteClick = note => {
    setSelectedNote(note);
    setEditingNote(null);
  };

  const handleEditNote = note => {
    setEditingNote(note);
  };

  const handleDeleteNote = note => {
    fetch(`http://localhost:3000/notes/${note.id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        const updatedNotes = notes.filter(item => item !== note);
        setNotes(updatedNotes);
        setSelectedNote(null);
        console.log('Note deleted successfully');
      } else {
        throw new Error('Failed to delete note');
      }
    })
    .catch(error => console.error('Error deleting note:', error));
  };

  const filteredNotes = showArchived ? notes.filter(note => note.archived) : notes.filter(note => !note.archived);

  const handleCategoryFilterChange = e => {
    setCategoryFilter(e.target.value);
  };

  const filteredByCategoryNotes = categoryFilter
  ? filteredNotes.filter(note => note.category && note.category.toLowerCase().includes(categoryFilter.toLowerCase()))
  : filteredNotes;

  const filteredNotesToShow = showArchived ? filteredByCategoryNotes.filter(note => note.archived) : filteredByCategoryNotes;

  return (
    <div className="main">
      <h1>Notes</h1>
      <div className="search">
        <input 
          type="text" 
          placeholder="Search by category" 
          value={categoryFilter} 
          onChange={handleCategoryFilterChange} 
        />
      </div>
      <div className="notes-container">
        {filteredNotesToShow.map(note => (
          <div
            key={note.id}
            className={`note-item ${selectedNote === note ? 'selected' : ''}`}
            onClick={() => handleNoteClick(note)}
          >
            <div className="note-content">
              <div className="note-text">
                <h2>Title: {note.title}</h2>
                <p>Category: {note.category}</p>
              </div>
              <div className="icons-container">
                <Link to={`/editNote/${note.id}`}>
                  <span className="edit-icon" onClick={() => handleEditNote(note)}>
                    ✏️
                  </span>
                </Link>
                <span className="delete-icon" onClick={() => handleDeleteNote(note)}>
                  🗑️
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={showArchived} 
            onChange={() => setShowArchived(!showArchived)} 
          />
          <span className="slider round"></span>
        </label>
        <span>Show archived</span>
      </div>
      <Link to="/createNote">
        <button>Create Note</button>
      </Link>
    </div>
  );
};
export default NoteList;
