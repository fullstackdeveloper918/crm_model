// app/api/create-zoom-meeting/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { access_token, topic, start_time, duration, agenda } = await request.json();

    // Validate the incoming data
    if (!access_token || !topic || !start_time || !duration || !agenda) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create Zoom meeting via the Zoom API
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

    // Return the Zoom meeting details
    return NextResponse.json({
      join_url: response.data.join_url,
      meeting_id: response.data.id,
      topic: response.data.topic,
      start_time: response.data.start_time,
    });
  } catch (error) {
    console.error('Zoom API Error:', error);
    return NextResponse.json({ error: 'Failed to create Zoom meeting' }, { status: 500 });
  }
}
