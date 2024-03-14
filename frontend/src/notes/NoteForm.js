import React, { useState } from 'react';
import './NoteForm.css'; 
import { useNavigate } from 'react-router-dom';

const NoteForm = ({ onSubmit }) => {
  const [title, setTitle] = useState(''); 
  const [category, setCategory] = useState(''); 
  const [archived, setArchived] = useState(false); 
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleArchivedChange = (event) => {
    setArchived(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, category, archived }) 
      });
      if (response.ok) {
        const createdNote = await response.json();
        onSubmit(createdNote); 
        setTitle('');
        setArchived(false); 
        navigate('/notes'); 
      } else {
        console.error('Error creating note:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h1>Create a Note</h1>
      <div className="input-container">
        <input
          className="input-title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="input-container">
        <input
          className="input-title"
          type="text"
          placeholder="Category"
          value={category}
          onChange={handleCategoryChange}
        />
      </div>
      <label className="checkbox-label">
        <input
          className="checkbox"
          type="checkbox"
          checked={archived}
          onChange={handleArchivedChange}
        />
        Archive
      </label>
      <button type="submit" className="submit-button">Create Note</button>
    </form>
  );
};

export default NoteForm;
