// import { sAuth } from "app/stores/authStore";
import useAuthStore from "../stores/authStore";
import { getCookie, setCookie } from "./cookie";
import { isTokenExpired } from "./jwtUtil";

const SendRequest = async (
  method: string,
  url: string,
  body: any = {},
  privateEndpoint = true,
  isFile = false
) => {
  let header = {
    Accept: "application/json, text/plain",
    Authorization: `Bearer ${getCookie("accessToken")}`,
  };

  const data = await fetch(import.meta.env.VITE_SERVER_URL + url, {
    method: method,
    headers: header,
    body: isFile ? body : method === "GET" ? null : JSON.stringify(body),
  });
  const json = await data.json();

  if (
    privateEndpoint &&
    (getCookie("accessToken") === "" || isTokenExpired())
  ) {
    alert("Session expired, please login again");
    useAuthStore().logout();
  }

  // returned array json
  if (json instanceof Array) {
    return {
      data: [...json],
      status: data.status,
    };
  }
  // returned message json
  return {
    data: json,
    status: data.status,
  };
};

export const GET = async (url: string, privateEndpoint = true) =>
  await SendRequest("GET", url, {}, privateEndpoint);
export const POST = async (
  url: string,
  body: any,
  privateEndpoint = true,
  isFile = false
) => await SendRequest("POST", url, body, privateEndpoint, isFile);
export const PUT = async (url: string, body: any, privateEndpoint = true) =>
  await SendRequest("PUT", url, body, privateEndpoint);
export const PATCH = async (url: string, body: any, privateEndpoint = true) =>
  await SendRequest("PATCH", url, body, privateEndpoint);
export const DELETE = async (url: string, body: any, privateEndpoint = true) =>
  await SendRequest("DELETE", url, body, privateEndpoint);
