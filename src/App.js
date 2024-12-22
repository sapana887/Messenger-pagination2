import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './actions';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { users, page } = useSelector((state) => state);
  const [selectedUser, setSelectedUser] = useState(null); // For tracking selected user

  useEffect(() => {
    dispatch(fetchUsers(page)); // Fetch initial users
  }, [dispatch, page]);

  const handleUserClick = (user) => {
    setSelectedUser(user); // Set the selected user to open their chat
  };

  const goBack = () => {
    setSelectedUser(null); // Go back to the chat list
  };

  return (
    <div className="App">
      {!selectedUser ? (
        // Chat List View
        <div className="chat-list">
          <div className="header">Messenger</div>
          <div className="chat-list-content">
            {users.map((user) => (
              <div
                key={user.id}
                className="chat-item"
                onClick={() => handleUserClick(user)}
              >
                <div className="chat-avatar">
                  {user.name[0]} {/* First letter of the user's name */}
                </div>
                <div className="chat-info">
                  <div className="chat-name">{user.name}</div>
                  <div className="chat-preview">Hello! Tap to chat.</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Chat Box View
        <div className="chat-box">
          <div className="header">
            <button className="back-button" onClick={goBack}>
              ← Back
            </button>
            {selectedUser.name}
          </div>
          <div className="message-list">
            <div
              className={`message ${
                selectedUser.id % 2 === 0 ? 'incoming' : 'outgoing'
              }`}
            >
              <p>
                Hello! This is a message from {selectedUser.name}.
                <br />
                ID: {selectedUser.id}
              </p>
              <p className="timestamp">Timestamp Placeholder</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

