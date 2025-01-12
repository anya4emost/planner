import { IS_AUTHORIZED_API, REFRESH_TOKEN_API, TASKS_API } from "./urls";

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

export const serversTasksRequest = async (accessToken: string | undefined, refreshToken: string | undefined) => {
  let response = await fetch(`http://localhost:4000${TASKS_API}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Cookie: `access-token=${accessToken}; refresh-token=${refreshToken}`,
    },
  });

  let result = await response.json();
  return result;
};
