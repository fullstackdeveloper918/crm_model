// pages/api/zoom/callback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import querystring from 'querystring';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query; // The authorization code from Zoom

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    const { ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, ZOOM_REDIRECT_URI } = process.env;

    // Prepare the request body to exchange the code for an access token
    const tokenData = querystring.stringify({
      grant_type: 'authorization_code',
      code: code as string,
      redirect_uri: ZOOM_REDIRECT_URI,
    });

    // Basic authentication header with client_id and client_secret
    const authHeader = `Basic ${Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64')}`;

    // Send the request to Zoom's token endpoint to exchange code for token
    const response = await axios.post(
      'https://zoom.us/oauth/token',
      tokenData,
      {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    // Store the access_token securely (e.g., in a session or database)
    res.status(200).json({ access_token, refresh_token });
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).json({ error: 'Failed to exchange authorization code for token' });
  }
}
