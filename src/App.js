// App.js

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSave = () => {
    // Call API to save content
    axios.post('/api/save', { name, content })
      .then(response => {
        setAlertMessage('Changes saved successfully!');
        setAlertType('success');
      })
      .catch(error => {
        setAlertMessage('An error occurred while saving changes.');
        setAlertType('error');
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Create Post</h1>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} style={{ width: '300px', fontSize: '16px' }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="content">Content:</label>
        <textarea id="content" value={content} onChange={handleContentChange} style={{ width: '300px', height: '150px', fontSize: '16px' }} />
      </div>
      <button onClick={handleSave} style={{ padding: '10px 20px', fontSize: '16px' }}>Save</button>
      {alertMessage && (
        <div style={{ marginTop: '15px', fontSize: '16px', backgroundColor: alertType === 'success' ? 'green' : 'red', color: 'white', padding: '10px', borderRadius: '5px' }}>
          {alertMessage}
        </div>
      )}
    </div>
  );
}

export default App;
