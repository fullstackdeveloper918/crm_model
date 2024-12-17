// app/api/create-teams-meeting/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
// import { getAccessToken } from '../../../lib/msalAuth';

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { subject, startTime, endTime } = await req.json();  // Add userId to the request

    // Log the incoming data
    const userId="8a213d58-7e48-4a8c-91f8-74260fd2ebe2"
    console.log("Received request to create a meeting:", { subject, startTime, endTime,userId });
    // Validate that required fields are present
    if (!subject || !startTime || !endTime || !userId) {
      console.error("Missing required fields: subject, startTime, endTime, or userId");
      return NextResponse.json(
        { error: "Subject, startTime, endTime, and userId are required" },
        { status: 400 }
      );
    }

    // Get the access token for Microsoft Graph API
    // const accessToken = await getAccessToken();
    // console.log("Access token obtained:", accessToken);

    // if (!accessToken) {
    //   console.error("Failed to acquire access token");
    //   return NextResponse.json({ error: "Failed to acquire access token" }, { status: 500 });
    // }

    // Ensure start and end times are in the correct ISO format
    const startDateTime = new Date(startTime).toISOString();
    const endDateTime = new Date(endTime).toISOString();

    console.log("Formatted Start Time:", startDateTime);
    console.log("Formatted End Time:", endDateTime);

    // Make the API request to Microsoft Graph to create the Teams meeting for the specified user
    const response = await axios.post(
      `https://graph.microsoft.com/v1.0/users/${userId}/onlineMeetings`,
      {
        startDateTime,
        endDateTime,
        subject,
      },
      {
        headers: {
          Authorization: `Bearer ${"accessToken"}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Log the response from Graph API
    console.log("Teams meeting created:", response.data);

    // Extract the meeting link from the response
    const meetingLink = response.data.joinUrl;

    // Return the meeting link in the response
    return NextResponse.json({ meetingLink });
  } catch (error: any) {
    console.error("Error creating Teams meeting:", error);

    if (error.response) {
      console.error("Graph API Error Response:", error.response.data);
      console.error("Graph API Error Status:", error.response.status);
      console.error("Graph API Error Headers:", error.response.headers); // Logs headers too
    } else {
      console.error("Error without response:", error.message); // Logs for network errors
    }

    return NextResponse.json(
      { error: "Failed to create Teams meeting", details: error.message },
      { status: 500 }
    );
  }
}
