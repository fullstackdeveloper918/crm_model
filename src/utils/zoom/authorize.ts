// pages/api/zoom/authorize.ts
import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ZOOM_CLIENT_ID, ZOOM_REDIRECT_URI } = process.env;

  const zoomAuthUrl = 'https://zoom.us/oauth/authorize';
  const authParams = querystring.stringify({
    response_type: 'code',  // OAuth response type
    client_id: ZOOM_CLIENT_ID,
    redirect_uri: ZOOM_REDIRECT_URI,
  });

  // Redirect the user to Zoom's OAuth 2.0 authorization page
  res.redirect(`${zoomAuthUrl}?${authParams}`);
}
