// lib/msalAuth.ts
import { ConfidentialClientApplication } from "@azure/msal-node";
import { msalConfig } from "./msalConfig"

// Initialize MSAL Confidential Client Application
const cca = new ConfidentialClientApplication(msalConfig);

export async function getAccessToken() {
  const tokenRequest = {
    scopes: ["https://graph.microsoft.com/.default"],  // Microsoft Graph API scope
  };

  try {
    const authResponse = await cca.acquireTokenByClientCredential(tokenRequest);
    console.log(authResponse,"authResponse");
    
    return authResponse?.accessToken;
  } catch (error) {
    console.error("Error acquiring token:", error);
    throw error;
  }
}
