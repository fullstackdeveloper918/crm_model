// pages/index.tsx
"use client"
import { useState } from 'react';

export default function Home() {
  const [meetingDetails, setMeetingDetails] = useState({
    topic: '',
    startTime: '',
    duration: 30,
    agenda: '',
  });
  const [joinUrl, setJoinUrl] = useState('');
  const [accessToken, setAccessToken] = useState(''); // The access token from OAuth

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingDetails({
      ...meetingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/create-zoom-meeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: accessToken, // Ensure this is set after OAuth login
        topic: meetingDetails.topic,
        start_time: meetingDetails.startTime, // Ensure this is in UTC format
        duration: meetingDetails.duration,
        agenda: meetingDetails.agenda,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setJoinUrl(data.join_url);
    } else {
      const errorData = await response.json();
      console.error(errorData.error);
    }
  };

  return (
    <div>
      <h1>Create a Zoom Meeting</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="topic"
          placeholder="Meeting Topic"
          value={meetingDetails.topic}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="startTime"
          value={meetingDetails.startTime}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={meetingDetails.duration}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="agenda"
          placeholder="Agenda"
          value={meetingDetails.agenda}
          onChange={handleInputChange}
        />
        <button type="submit">Create Meeting</button>
      </form>
      {joinUrl && <a href={joinUrl} target="_blank" rel="noopener noreferrer">Join your meeting</a>}
    </div>
  );
}