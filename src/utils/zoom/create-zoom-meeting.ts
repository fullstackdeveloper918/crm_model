// pages/api/create-zoom-meeting.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { access_token, topic, start_time, duration, agenda } = req.body;

  if (!access_token || !topic || !start_time || !duration || !agenda) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Call the Zoom API to create the meeting
    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic,
        type: 2, // Scheduled meeting
        start_time,
        duration,
        agenda,
        timezone: 'America/New_York', // Adjust to your timezone
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json({
      join_url: response.data.join_url,
      meeting_id: response.data.id,
      topic: response.data.topic,
      start_time: response.data.start_time,
    });
  } catch (error) {
    console.error('Zoom API Error:', error);
    return res.status(500).json({ error: 'Failed to create Zoom meeting' });
  }
}
