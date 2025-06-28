// src/components/Chat/Chat.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { auth, db } from '../../firebase/firebaseConfig';
// import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
// import { FaPaperPlane } from 'react-icons/fa';
// import './Chat.css';

// const Chat = ({ classId }) => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const user = auth.currentUser;
//     const messagesEndRef = useRef(null);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(scrollToBottom, [messages]);

//     useEffect(() => {
//         if (!classId) return;

//         const messagesRef = collection(db, 'classes', classId, 'messages');
//         const q = query(messagesRef, orderBy('createdAt'));

//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const fetchedMessages = snapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setMessages(fetchedMessages);
//         });

//         return () => unsubscribe();
//     }, [classId]);

//     const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (newMessage.trim() === '' || !user) return;

//         const messagesRef = collection(db, 'classes', classId, 'messages');
//         await addDoc(messagesRef, {
//             text: newMessage,
//             createdAt: serverTimestamp(),
//             uid: user.uid,
//             displayName: user.displayName,
//         });

//         setNewMessage('');
//     };
    
//     const formatTimestamp = (timestamp) => {
//         if (!timestamp) return '';
//         return timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     };

//     return (
//         // The main container for the entire chat UI
//         <div className="chat-container">
//             {/* --- THIS IS THE UPDATED PART --- */}
//             {/* The h2 is now inside the main container */}
//             <div className="chat-header">
//                 <h2>Class Chat</h2>
//             </div>
            
//             <div className="chat-messages">
//                 {messages.map(msg => (
//                     <div key={msg.id} className={`message ${msg.uid === user?.uid ? 'sent' : 'received'}`}>
//                         <div className="message-sender-name">{msg.displayName}</div>
//                         <p className="message-text">{msg.text}</p>
//                         <div className="message-timestamp">{formatTimestamp(msg.createdAt)}</div>
//                     </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//             </div>
            
//             <form className="chat-form" onSubmit={handleSendMessage}>
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Type your message..."
//                 />
//                 <button type="submit" disabled={!newMessage.trim()}>
//                     <FaPaperPlane />
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Chat;

// src/components/Chat/Chat.jsx

// import React, { useState, useEffect, useRef } from 'react';
// import { auth, db } from '../../firebase/firebaseConfig';
// import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
// import { FaPaperPlane } from 'react-icons/fa';
// import './Chat.css';

// const Chat = ({ classId }) => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const user = auth.currentUser;
//     const messagesEndRef = useRef(null);

//     // Auto-scroll to the newest message
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);

//     // Listen for new messages
//     useEffect(() => {
//         if (!classId) return;
//         const messagesRef = collection(db, 'classes', classId, 'messages');
//         const q = query(messagesRef, orderBy('createdAt'));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const fetchedMessages = snapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setMessages(fetchedMessages);
//         });
//         return () => unsubscribe();
//     }, [classId]);

//     // Send a new message
//     const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (newMessage.trim() === '' || !user) return;
//         const messagesRef = collection(db, 'classes', classId, 'messages');
//         await addDoc(messagesRef, {
//             text: newMessage,
//             createdAt: serverTimestamp(),
//             uid: user.uid,
//             displayName: user.displayName,
//         });
//         setNewMessage('');
//     };
    
//     // Helper to format the time
//     const formatTimestamp = (timestamp) => {
//         if (!timestamp) return '';
//         return timestamp.toDate().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
//     };

//     return (
//         <div className="chat-container">
//             <div className="chat-header">
//                 <h2>Class Chat</h2>
//             </div>
//             <div className="messages-area">
//                 {messages.map(msg => (
//                     <div 
//                         key={msg.id} 
//                         className={`message ${msg.uid === user?.uid ? 'sent' : 'received'}`}
//                     >
//                         {/* --- NEW LOGIC FOR DISPLAYING SENDER --- */}
//                         {/* Only show the sender's name if it's a RECEIVED message */}
//                         {msg.uid !== user?.uid && (
//                             <div className="sender">{msg.displayName}</div>
//                         )}
                        
//                         <p className="text">{msg.text}</p>
//                         <div className="timestamp">{formatTimestamp(msg.createdAt)}</div>
                        
//                         {/* If it's a SENT message, show the sender's name inside the bubble */}
//                         {msg.uid === user?.uid && (
//                             <div className="sender">{msg.displayName}</div>
//                         )}
//                     </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//             </div>
//             <form className="message-input-form" onSubmit={handleSendMessage}>
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Type your message..."
//                 />
//                 <button type="submit" disabled={!newMessage.trim()}>
//                     <FaPaperPlane />
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Chat;-------------------correct
// import React, { useState, useEffect, useRef } from 'react';
// import { auth, db } from '../../firebase/firebaseConfig';
// import {
//     collection,
//     query,
//     orderBy,
//     onSnapshot,
//     addDoc,
//     serverTimestamp,
//     updateDoc,
//     doc
// } from 'firebase/firestore';
// import { FaPaperPlane } from 'react-icons/fa';
// import './Chat.css';

// const Chat = ({ classId }) => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const user = auth.currentUser;
//     const messagesEndRef = useRef(null);

//     // Auto-scroll to bottom
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     // Listen for messages + mark unread as read
//     useEffect(() => {
//         if (!classId || !user) return;

//         const messagesRef = collection(db, 'classes', classId, 'messages');
//         const q = query(messagesRef, orderBy('createdAt'));

//         const unsubscribe = onSnapshot(q, async (snapshot) => {
//             const fetchedMessages = snapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));

//             setMessages(fetchedMessages);

//             // Remove current user's UID from unreadBy array (mark as read)
//             snapshot.docs.forEach(async msgDoc => {
//                 const msgData = msgDoc.data();
//                 if (msgData.unreadBy?.includes(user.uid)) {
//                     await updateDoc(doc(db, 'classes', classId, 'messages', msgDoc.id), {
//                         unreadBy: msgData.unreadBy.filter(uid => uid !== user.uid)
//                     });
//                 }
//             });
//         });

//         return () => unsubscribe();
//     }, [classId, user]);

//     // Send a message
//     const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (newMessage.trim() === '' || !user) return;

//         const messagesRef = collection(db, 'classes', classId, 'messages');
//         await addDoc(messagesRef, {
//             text: newMessage,
//             createdAt: serverTimestamp(),
//             uid: user.uid,
//             displayName: user.displayName,
//             unreadBy: [] // sender has seen it already
//         });

//         // You can add logic here to fetch class students and set unreadBy: [uids of students except sender]
//         setNewMessage('');
//     };

//     // Format time
//     const formatTimestamp = (timestamp) => {
//         if (!timestamp) return '';
//         return timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     };

//     return (
//         <div className="chat-container">
//             <div className="chat-header">
//                 <h2>Class Chat</h2>
//             </div>
//             <div className="messages-area">
//                 {messages.map(msg => (
//                     <div
//                         key={msg.id}
//                         className={`message ${msg.uid === user?.uid ? 'sent' : 'received'}`}
//                     >
//                         {msg.uid !== user?.uid && (
//                             <div className="sender">{msg.displayName}</div>
//                         )}
//                         <p className="text">{msg.text}</p>
//                         <div className="timestamp">{formatTimestamp(msg.createdAt)}</div>
//                         {msg.uid === user?.uid && (
//                             <div className="sender">{msg.displayName}</div>
//                         )}
//                     </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//             </div>
//             <form className="message-input-form" onSubmit={handleSendMessage}>
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Type your message..."
//                 />
//                 <button type="submit" disabled={!newMessage.trim()}>
//                     <FaPaperPlane />
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Chat;
// ============================
// Chat.jsx (Full Updated Code)
// ============================

import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../../firebase/firebaseConfig';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
    getDoc,
    updateDoc,
    doc
} from 'firebase/firestore';
import { FaPaperPlane } from 'react-icons/fa';
import './Chat.css';

const Chat = ({ classId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const user = auth.currentUser;
    const messagesEndRef = useRef(null);

    // Auto-scroll to the newest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Listen for new messages and mark as read
    useEffect(() => {
        if (!classId || !user) return;

        const messagesRef = collection(db, 'classes', classId, 'messages');
        const q = query(messagesRef, orderBy('createdAt'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(fetchedMessages);

            // Mark unread messages as read for this user
            snapshot.docs.forEach(async msgDoc => {
                const msgData = msgDoc.data();
                if (msgData.unreadBy?.includes(user.uid)) {
                    await updateDoc(doc(db, 'classes', classId, 'messages', msgDoc.id), {
                        unreadBy: msgData.unreadBy.filter(uid => uid !== user.uid)
                    });
                }
            });
        });

        return () => unsubscribe();
    }, [classId, user]);

    // Send a new message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !user) return;

        try {
            // Get enrolled students to set unreadBy
            const classDocRef = doc(db, 'classes', classId);
            const classSnap = await getDoc(classDocRef);
            const classData = classSnap.data();
            const enrolledStudents = classData?.enrolledStudents || [];

            const unreadBy = enrolledStudents.filter(uid => uid !== user.uid);

            const messagesRef = collection(db, 'classes', classId, 'messages');
            await addDoc(messagesRef, {
                text: newMessage,
                createdAt: serverTimestamp(),
                uid: user.uid,
                displayName: user.displayName,
                unreadBy: unreadBy,
            });
            setNewMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        return timestamp.toDate().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Class Chat</h2>
            </div>
            <div className="messages-area">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`message ${msg.uid === user?.uid ? 'sent' : 'received'}`}
                    >
                        {msg.uid !== user?.uid && <div className="sender">{msg.displayName}</div>}
                        <p className="text">{msg.text}</p>
                        <div className="timestamp">{formatTimestamp(msg.createdAt)}</div>
                        {msg.uid === user?.uid && <div className="sender">{msg.displayName}</div>}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form className="message-input-form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit" disabled={!newMessage.trim()}>
                    <FaPaperPlane />
                </button>
            </form>
        </div>
    );
};

export default Chat;
