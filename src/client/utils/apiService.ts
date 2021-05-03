import fetch from "isomorphic-fetch";

export let AccessToken: string = localStorage.getItem("token") || null;
export let User: any = JSON.parse(localStorage.getItem("user")) || {};

export const abortFetching = (controller: any) => {
  console.log("Now aborting");
  // Abort.
  controller.abort();
};

export const apiService = async (
  url: string,
  lecture: boolean = false,
  method: string = "GET",
  signal?: any,
  body?: {}
) => {
  let headers: any = { "Content-Type": "application/json" };

  if (AccessToken) {
    headers["Authorization"] = `Bearer ${AccessToken}`;
  }

  try {
    let res = await fetch(url, {
      method,
      headers,
      signal,
      body: JSON.stringify(body),
    });
    if (res.ok) {
      return lecture ? await res.text() : await res.json();
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const setAccessToken = (token: string, user: {} = {}) => {
  AccessToken = token;
  User = user;

  localStorage.setItem("token", AccessToken);
  localStorage.setItem("user", JSON.stringify(User));
};

export const removeAccessTokens = () => {
  localStorage.clear();
  AccessToken = null;
  User = {};
};
