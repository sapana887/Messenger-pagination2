import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from './actions';
import MessageItem from './MessageItem';

const MessageList = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { messages, loading } = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchMessages(page));
    }, [dispatch, page]);

    const loadMoreMessages = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div style={{ height: '80vh', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}
            onScroll={(e) => {
                if (e.target.scrollTop === 0) loadMoreMessages();
            }}
        >
            {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default MessageList;