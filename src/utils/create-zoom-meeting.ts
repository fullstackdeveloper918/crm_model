// pages/api/create-zoom-meeting.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
// import { ZoomMeetingRequest, ZoomMeetingResponse } from '../../';

// Replace these with your Zoom JWT or OAuth credentials
const ZOOM_API_KEY = "yaTbis2SSZudjkyR8uSFIQ";
const ZOOM_API_SECRET = "FedXj2s1MhobCNjGbwvJrJ2ZlMxsAYB6";
// const ZOOM_JWT_TOKEN = "9NeZehRIQ9GXf4dbjBZ97g"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const meetingData: any = req.body;

  try {
    // Zoom API URL to create a meeting
    const response = await axios.post<any>(
      'https://api.zoom.us/v2/users/me/meetings',
      meetingData,
      {
        headers: {
        //   Authorization: `Bearer ${ZOOM_JWT_TOKEN}`, // or use OAuth tokens
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the join link and other details
    return res.status(200).json({
      joinUrl: response.data.join_url,
      meetingId: response.data.id,
      topic: response.data.topic,
      startTime: response.data.start_time,
    });
  } catch (error) {
    console.error('Zoom API Error:', error);
    return res.status(500).json({ error: 'Failed to create Zoom meeting' });
  }
}
