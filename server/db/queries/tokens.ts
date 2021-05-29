import Query from "../query";

const findToken = (tokenid: number, token: string) => {
  return Query("SELECT * FROM AccessTokens WHERE TokenID = ? AND Token = ?", [
    tokenid,
    token,
  ]);
};

const findTokenByVal = (token: string) => {
  return Query("SELECT * FROM AccessTokens WHERE Token = ?", [token]);
};

const addToken = (userid: number) => {
  return Query("INSERT INTO AccessTokens SET UserID = ?", [userid]);
};

const updateToken = (TokenID: number, token: string) => {
  return Query("UPDATE AccessTokens SET token = ? WHERE TokenID = ?", [
    token,
    TokenID,
  ]);
};

export default {
  findToken,
  findTokenByVal,
  addToken,
  updateToken,
};
