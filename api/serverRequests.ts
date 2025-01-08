import { IS_AUTHORIZED_API, REFRESH_TOKEN_API } from "./urls";

export const isAuthorizedRequest = async (headers: Headers) => {
  let response = await fetch(`http://localhost:4000${IS_AUTHORIZED_API}`, {
    method: "GET",
    headers
  });

  let result = await response.json();
  return result;
};

export const refreshTokenRequest = async (headers: Headers) => {
  let response = await fetch(`http://localhost:4000${REFRESH_TOKEN_API}`, {
    method: "POST",
    headers,
  });

  let result = await response.json();
 
  return { result, headersSetCookie: response.headers.get("Set-Cookie") };
};
