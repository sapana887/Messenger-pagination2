
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './actions';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { users, page } = useSelector((state) => state);
  const [selectedUser, setSelectedUser] = useState(null); // For tracking selected user
  const messageListRef = useRef(null); // Ref for the message list

  // Fetch users when the page changes
  useEffect(() => {
    dispatch(fetchUsers(page)); // Fetch users based on the current page
  }, [dispatch, page]);

  // Scroll handler to load more users when scrolling upwards
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop === 0) {
      dispatch(fetchUsers(page)); // Fetch next page of users when scrolled to top
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user); // Set the selected user to open their chat
  };

  const goBack = () => {
    setSelectedUser(null); // Go back to the chat list
  };

  // Automatically scroll to the bottom when the page is loaded or new messages are added
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [selectedUser, users]); // Trigger when users or selectedUser changes

  return (
    <div className="App">
      {!selectedUser ? (
        // Chat List View
        <div className="chat-list">
          <div className="header">Messenger</div>
          <div className="chat-list-content" onScroll={handleScroll}>
            {users.map((user, index) => (
              <div
                key={user.id}
                className={`chat-item ${
                  index % 2 === 0 ? 'incoming' : 'outgoing'
                }`}
                onClick={() => handleUserClick(user)}
              >
                <div className="chat-avatar">
                  {user.name[0]} {/* First letter of the user's name */}
                </div>
                <div className="chat-info">
                  <div className="chat-name">{user.name}</div>
                  <div className="chat-preview">Tap to chat</div>
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
          <div className="message-list" ref={messageListRef}>
            {users.map((user, index) => (
              <div
                key={user.id}
                className={`message ${
                  index % 2 === 0 ? 'incoming' : 'outgoing'
                }`}
              >
                <p>
                  Message from {user.name}
                  <br />
                  ID: {user.id}
                </p>
                <p className="timestamp">Timestamp Placeholder</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
