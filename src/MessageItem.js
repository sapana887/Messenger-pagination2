import React from 'react';

const MessageItem = ({ message }) => {
    const isIncoming = message.type === 'incoming';
    return (
        <div
            style={{
                textAlign: isIncoming ? 'left' : 'right',
                padding: '10px',
                margin: '5px 0',
            }}
        >
            <span
                style={{
                    display: 'inline-block',
                    padding: '10px',
                    backgroundColor: isIncoming ? '#e0e0e0' : '#4caf50',
                    color: isIncoming ? '#000' : '#fff',
                    borderRadius: '10px',
                }}
            >
                {message.message}
            </span>
        </div>
    );
};

export default MessageItem;