import fetch from "isomorphic-fetch";

export let AccessToken: string = localStorage.getItem("token") || null;
export let User: any = {
  userid: localStorage.getItem("userid") || null,
  role: localStorage.getItem("role") || null,
};

export const apiService = async (
  url: string,
  method: string = "GET",
  body?: {}
) => {
  let headers: any = { "Content-Type": "application/json" };

  if (AccessToken) {
    headers["Authorization"] = `Bearer ${AccessToken}`;
  }

  try {
    let res = await fetch(url, { method, headers, body: JSON.stringify(body) });
    if (res.ok) {
      return await res.json();
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const setAccessToken = (
  token: string,
  user: {} = { userid: undefined, role: "visitor" }
) => {
  AccessToken = token;
  User = user;

  localStorage.setItem("token", AccessToken);
  localStorage.setItem("userid", User.userid);
  localStorage.setItem("role", User.role);
};

export const removeAccessTokens = () => {
  localStorage.clear();
  AccessToken = null;
  User = {
    userid: null,
    role: null,
  };
};
