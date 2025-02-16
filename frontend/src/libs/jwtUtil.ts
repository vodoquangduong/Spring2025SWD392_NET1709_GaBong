import { getCookie } from "./cookie";

export function decodeJWT(token: string) {
  // Split the token into its parts
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      //return {};
      throw new Error("Invalid token format");
    }

    // Decode the payload (the second part)
    const payload = parts[1];

    // Replace URL-safe characters
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");

    // Decode Base64
    const decoded = atob(base64);

    // Parse JSON
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return {}; // Always return an object to avoid undefined
  }
}

export function isTokenExpired() {
  if (getCookie("accessToken")) {
    const expiry = decodeJWT(getCookie("accessToken"))?.exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
  return false;
}
