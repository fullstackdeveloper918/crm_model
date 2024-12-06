// app/page.tsx
'use client'

import { useState } from 'react';

export default function Home() {
  const [subject, setSubject] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [meetingLink, setMeetingLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);  // Add error state
console.log(meetingLink,"meetingLink");

  const handleGenerateMeeting = async () => {
    try {
      let item={
        subject:subject,
        startTime:startTime,
        endTime:endTime
      }
      console.log(item,"item");
      
      const response = await fetch('/api/create-teams-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      const data = await response.json();

      // Log the response data
      console.log("API response:", data);

      if (data.meetingLink) {
        setMeetingLink(data.meetingLink);
        setError(null);  // Clear any previous error
      } else {
        setError(data.error || "Failed to generate meeting link");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while generating the meeting link");
    }
  };

  return (
    <div>
      <h1>Teams Meeting Generator</h1>
      <div>
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          End Time:
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleGenerateMeeting}>Generate Meeting</button>
      </div>

      {meetingLink && (
        <div>
          <h2>Meeting Link</h2>
          <a href={meetingLink} target="_blank" rel="noopener noreferrer">
            {meetingLink}
          </a>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
