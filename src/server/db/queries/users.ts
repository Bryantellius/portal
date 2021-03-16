import Query from "../models";

const findOneUserById = (userid: number) => {
  return Query("SELECT * FROM Users WHERE UserID = ?", [userid]);
};

const findOneUserByEmail = (email: string) => {
  return Query("SELECT * FROM Users WHERE Email = ?", [email]);
};

const insertUser = (user: any) => {
  return Query("INSERT INTO Users SET ?", [user]);
};

const updateUser = (userid: number, user: any) => {
  return Query("UPDATE Users SET ? WHERE UserID = ?", [user, userid]);
};

const removeUser = (userid: number) => {
  return Query("DELETE FROM Users WHERE UserID = ?", [userid]);
};

export default {
  findOneUserByEmail,
  findOneUserById,
  insertUser,
  updateUser,
  removeUser,
};
