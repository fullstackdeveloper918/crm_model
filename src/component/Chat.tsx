// components/Chat.tsx
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

let socket: any;

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect to the socket server
    socket = io('https://srv626615.hstgr.cloud/'); // Make sure this matches your backend URL

    // Listen for "activityfor" events from the server
    socket.on('activityfor', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Emit an "activity" event to the server with the message
      socket.emit('activity', input);
      setInput('');
    }
  };

  const stopActivity = () => {
    // Emit "activity_stop" event to the server
    socket.emit('activity_stop', 'Activity has stopped');
  };

  // Scroll to the bottom of the messages list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      <ul id="messages" style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        {messages.map((msg, index) => (
          <li key={index} style={{ padding: '0.5rem 1rem', background: index % 2 === 0 ? '#efefef' : 'white' }}>
            {msg}
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>

      <form id="form" onSubmit={handleSubmit} style={{ background: 'rgba(0, 0, 0, 0.15)', position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', height: '3rem', boxSizing: 'border-box', backdropFilter: 'blur(10px)' }}>
        <input
          id="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ border: 'none', padding: '0 1rem', flexGrow: 1, borderRadius: '2rem', margin: '0.25rem' }}
          autoComplete="off"
        />
        <button style={{ background: '#333', border: 'none', padding: '0 1rem', margin: '0.25rem', borderRadius: '3px', outline: 'none', color: '#fff' }}>Send</button>
      </form>

      <button onClick={stopActivity} style={{ position: 'fixed', bottom: '5rem', left: '1rem', backgroundColor: '#333', color: 'white', padding: '10px', borderRadius: '5px' }}>
        Stop Activity
      </button>
    </div>
  );
};

export default Chat;
