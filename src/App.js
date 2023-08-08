// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomizedTimeline from './CustomizedTimeline';

function App() {
  const baseUrl = "http://localhost:4000/api"
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [postId, setPostId] = useState(1);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [changeList, setChangeList] = useState([])

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSave = () => {
    // Call API to save content
    const body = {
      username: name,
      content: content,
      id: postId
    }
    axios.post(baseUrl + '/post', body)
      .then(response => {
        setAlertMessage('Changes saved successfully!');
        setAlertType('success');
        getPostAPI();
      })
      .catch(error => {
        setAlertMessage('An error occurred while saving changes.');
        setAlertType('error');
      });
  };

  const getChanges = async () => {
    try {
      const resp = await axios.get(baseUrl + '/changes')
      if (!resp) { return }
      setChangeList(resp.data.changes)
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getPostAPI(); // Call the API when the page opens up
  }, []);


  const getPostAPI = () => {
    // Call API to get initial post data
    axios.get(baseUrl + '/post')
      .then(response => {
        console.log(response)
        const { username, content, id } = response.data;
        setName(username);
        setContent(content);
        setPostId(id);
        getChanges();

      })
      .catch(error => {
        console.error('Error fetching post data:', error);
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
      <CustomizedTimeline changeList={changeList} />
    </div>
  );
}

export default App;
