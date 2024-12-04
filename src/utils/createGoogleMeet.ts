// pages/api/createGoogleMeet.ts
import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

// Replace with your credentials from the Google Developer Console
const CLIENT_ID = '649797268892-7qb89use5oljtkvslopajghmdpjvck4l.apps.googleusercontent.com';
const CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';  // Set this in your Google OAuth credentials

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Function to generate Google Meet link
const createGoogleMeetEvent = async (title: string, start_time: string, end_time: string) => {
  try {
    // Get the OAuth2 client tokens from the session (for simplicity)
    const tokens = { access_token: 'YOUR_ACCESS_TOKEN', refresh_token: 'YOUR_REFRESH_TOKEN' };
    oauth2Client.setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Create Google Calendar event with Google Meet
    const event = {
      summary: title,
      description: title,
      start: {
        dateTime: start_time,
        timeZone: 'UTC',
      },
      end: {
        dateTime: end_time,
        timeZone: 'UTC',
      },
      conferenceData: {
        createRequest: {
          requestId: 'sample123',
          conferenceSolutionKey: { type: 'hangoutsMeet' },
          status: { statusCode: 'success' },
        },
      },
    };

    // Create the event with Google Meet link
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
    });

    return response.data.hangoutLink; // This will be the Google Meet link
  } catch (error) {
    console.error("Error creating Google Meet event", error);
    throw new Error("Could not create Google Meet event");
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, start_time, end_time } = req.body;

    try {
      const meetLink = await createGoogleMeetEvent(title, start_time, end_time);
      res.status(200).json({ meetLink });
    } catch (error) {
      res.status(500).json({ error: 'Error creating Google Meet event' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
