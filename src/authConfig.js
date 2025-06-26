import { LogLevel } from "@azure/msal-browser";
import { PublicClientApplication } from "@azure/msal-browser";
import { config } from "./config/config";

export const msalConfig = {
  auth: {
    clientId: config.microsoftClientID,
    authority: config.microsoftAuthority,
    redirectUri: "http://localhost:5173/dashboard",
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage", // {sessionStorage} This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};
export const loginRequest = {
  scopes: ["User.Read", "Email.read", "Profile.read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

export const pcaInstance = new PublicClientApplication(msalConfig);
