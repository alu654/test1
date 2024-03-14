import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './EditNote.css'; 

const EditNote = () => {
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [archived, setArchived] = useState(false);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { noteId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/notes/${noteId}`)
      .then(response => response.json())
      .then(data => {
        setNote(data);
        setTitle(data.title);
        setCategory(data.category);
        setArchived(data.archived);
        setLoading(false); 
      })
      .catch(error => console.error('Error fetching note:', error));
  }, [noteId]);

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };
  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };
  const handleArchivedChange = event => {
    setArchived(event.target.checked);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, category ,archived })
      });
      if (response.ok) {
        console.log('Note updated successfully');
        setRedirect(true); 
      } else {
        throw new Error('Failed to update note');
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  if (loading) { 
    return <div>Loading...</div>;
  }

  if (redirect) {
    return <Navigate to="/notes" />; 
  }

  return (
    <div className="note-form">
      <h1>Edit Note</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="input-title"
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={handleCategoryChange}
            className="input-title"
          />
        </div>
        <div className="checkbox-label">
          <label>
            <input
              type="checkbox"
              checked={archived}
              onChange={handleArchivedChange}
              className="checkbox"
            />
            Archive
          </label>
        </div>
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  );
}

export default EditNote;

