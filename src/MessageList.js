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


// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMessages } from './actions';
// import MessageItem from './MessageItem';

// const MessageList = () => {
//     const [page, setPage] = useState(1);
//     const [isAtBottom, setIsAtBottom] = useState(true); // Tracks if the user is at the bottom of the message list
//     const dispatch = useDispatch();
//     const { messages, loading } = useSelector((state) => state);
//     const messageEndRef = useRef(null);

//     useEffect(() => {
//         // Fetch initial messages
//         dispatch(fetchMessages(page));
//     }, [dispatch, page]);

//     // Automatically scroll to the bottom when new messages are added
//     useEffect(() => {
//         if (messageEndRef.current && isAtBottom) {
//             messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     }, [messages, isAtBottom]);

//     const loadMoreMessages = () => {
//         setPage((prevPage) => prevPage + 1);
//     };

//     const handleScroll = (e) => {
//         const { scrollTop, scrollHeight, clientHeight } = e.target;
//         setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
//     };

//     return (
//         <div
//             style={{ height: '80vh', overflow: 'auto', display: 'flex', flexDirection: 'column-reverse' }}
//             onScroll={(e) => {
//                 handleScroll(e);
//                 if (e.target.scrollTop === 0) loadMoreMessages();
//             }}
//         >
//             {messages.map((message) => (
//                 <MessageItem key={message.id} message={message} />
//             ))}
//             {loading && <p>Loading...</p>}
//             <div ref={messageEndRef} />
//             {!isAtBottom && (
//                 <button
//                     style={{
//                         position: 'fixed',
//                         bottom: '10px',
//                         right: '10px',
//                         padding: '10px 20px',
//                         background: '#007bff',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                     }}
//                     onClick={() => {
//                         if (messageEndRef.current) {
//                             messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
//                         }
//                     }}
//                 >
//                     Scroll to Bottom
//                 </button>
//             )}
//         </div>
//     );
// };

// export default MessageList;


// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMessages } from './actions';
// import MessageItem from './MessageItem';

// const MessageList = () => {
//     const [page, setPage] = useState(1);
//     const dispatch = useDispatch();
//     const { messages, loading } = useSelector((state) => state);
//     const messageListRef = useRef(null);

//     useEffect(() => {
//         dispatch(fetchMessages(page));
//     }, [dispatch, page]);

//     const scrollToBottom = () => {
//         if (messageListRef.current) {
//             setTimeout(() => {
//                 messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
//             }, 100); // Small delay for rendering
//         }
//     };

//     useEffect(() => {
//         // Scroll to the bottom on new messages
//         scrollToBottom();
//     }, [messages]);

//     useEffect(() => {
//         // Scroll to the bottom on component mount
//         scrollToBottom();
//     }, []);

//     const loadMoreMessages = () => {
//         setPage((prevPage) => prevPage + 1);
//     };

//     return (
//         <div
//             ref={messageListRef}
//             style={{ height: '80vh', overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse' }}
//             onScroll={(e) => {
//                 if (e.target.scrollTop === 0) loadMoreMessages();
//             }}
//         >
//             {loading && <p>Loading...</p>}
//             {messages.map((message) => (
//                 <MessageItem key={message.id} message={message} />
//             ))}
//         </div>
//     );
// };

// export default MessageList;

 





