import { IS_AUTHORIZED_API, LOGIN_API, REGISTER_API, TASKS_API } from "./urls";

export const registrationRequest =  async (name: string, password: string) => {
    let response = await fetch(REGISTER_API, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        password: password,
      }),
    });

    let result = await response.json();
    return result;
}

export const loginRequest = async (name: string, password: string) => {
  let response = await fetch(LOGIN_API, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      Username: name,
      Password: password,
    }),
  });

  let result = await response.json();
  return result;
};

export const tasksRequest = async () => {
  let response = await fetch(TASKS_API, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  let result = await response.json();
  return result;
};

export const isAuthorizedRequest = async () => {
  let response = await fetch(IS_AUTHORIZED_API, {
    method: "GET",
  });

  let result = await response.json();
  return result;
};