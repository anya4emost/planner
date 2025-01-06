import { LOGIN_API, REGISTER_API } from "./urls";

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