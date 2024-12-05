// pages/index.tsx
"use client"
import { useState } from 'react';
import dayjs from "dayjs";
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



  const [selectedOption, setSelectedOption] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [meetingLink, setMeetingLink] = useState<string>("");
console.log(meetingLink,"meetingLink");

  // Function to handle the select dropdown change
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // Function to handle date and time inputs
  const handleInputChange1 = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === "startDate") setStartDate(event.target.value);
    if (type === "startTime") setStartTime(event.target.value);
    if (type === "endDate") setEndDate(event.target.value);
    if (type === "endTime") setEndTime(event.target.value);
  };

  // Function to generate Google Meet or Zoom link
  const generateMeetingLink = async() => {
    const startDateTime = dayjs(`${startDate}T${startTime}`);
    const endDateTime = dayjs(`${endDate}T${endTime}`);

    // Validate if dates are valid
    if (!startDateTime.isValid() || !endDateTime.isValid() || !selectedOption) {
      setMeetingLink("Please fill in all fields and select a platform.");
      return;
    }

    // Format the date and time for the URL
    const formattedStartDate = startDateTime.format("YYYY-MM-DDTHH:mm:ss");
    const formattedEndDate = endDateTime.format("YYYY-MM-DDTHH:mm:ss");

    if (selectedOption === "googleMeet") {
      // Example Google Meet link (this can be enhanced with actual API calls in real-world scenarios)
      setMeetingLink(`https://meet.google.com/new?start=${formattedStartDate}&end=${formattedEndDate}`);
    } else if (selectedOption === "zoom") {
      // Example Zoom link with a placeholder ID (Zoom API would be used to create actual meetings in production)
      try {
        const response = await fetch("/api/createZoomMeeting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: formattedStartDate,
            startTime: formattedStartDate,
            endDate: formattedEndDate,
            endTime: formattedEndDate,
          }),
        });

        const data = await response.json();
        if (data.link) {
          setMeetingLink(data.link); // Zoom meeting link from API response
        } else {
          setMeetingLink("Failed to create Zoom meeting.");
        }
      } catch (error) {
        setMeetingLink("Error creating Zoom meeting.");
      }
    }
    else if (selectedOption === "teams") {
        try {
          const response = await fetch("/api/createTeamsMeeting", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startDate: formattedStartDate,
              startTime: formattedStartDate,
              endDate: formattedEndDate,
              endTime: formattedEndDate,
            }),
          });
  
          const data = await response.json();
          if (data.link) {
            setMeetingLink(data.link);
          } else {
            setMeetingLink("Failed to create Teams meeting.");
          }
        } catch (error) {
          setMeetingLink("Error creating Teams meeting.");
        }
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



      <div>
      <h1>Meeting Link Generator</h1>
      
      {/* Select Platform */}
      <div>
        <label>Select a platform:</label>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select</option>
          <option value="googleMeet">Google Meet</option>
          <option value="zoom">Zoom</option>
          <option value="teams">Microsoft Teams</option>
        </select>
      </div>
      
      {/* Start Date and Time */}
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => handleInputChange1(e, "startDate")}
        />
        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => handleInputChange1(e, "startTime")}
        />
      </div>
      
      {/* End Date and Time */}
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => handleInputChange1(e, "endDate")}
        />
        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => handleInputChange1(e, "endTime")}
        />
      </div>

      {/* Generate Link Button */}
      <button onClick={generateMeetingLink}>Generate Link</button>

      {/* Display the Generated Link */}
      {meetingLink && (
        <div>
          <h3>Generated Link:</h3>
          <a href={meetingLink} target="_blank" rel="noopener noreferrer">
            {meetingLink}
          </a>
        </div>
      )}
    </div>
    </div>
  );
}