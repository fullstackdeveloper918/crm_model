// lib/msalConfig.ts

if (!process.env.MS_CLIENT_ID || !process.env.MS_TENANT_ID || !process.env.MS_CLIENT_SECRET) {
    throw new Error('Missing environment variables: MS_CLIENT_ID, MS_TENANT_ID, or MS_CLIENT_SECRET');
  }
  
  export const msalConfig = {
    auth: {
      clientId: process.env.MS_CLIENT_ID,  // Should be a string now
      authority: `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}`,  // Your Azure tenant ID
      clientSecret: process.env.MS_CLIENT_SECRET,  // Should be a string now
    }as any,
    cache: {
      cacheLocation: "sessionStorage",  // Cache in the session storage
      storeAuthStateInCookie: true,  // Store state in cookies for IE support
    } as any,
  };
  