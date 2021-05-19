import Query from "../models";

const findOneUserById = (userid: number) => {
  return Query(
    "SELECT u.UserID, u.FirstName, u.LastName, u.email, u.password FROM USERS as u WHERE u.UserID = ?",
    [userid]
  );
};

const getOneUserById = (userid: number) => {
  return Query(
    "SELECT u.UserID, u.FirstName, u.LastName, u.email, u.RoleID, u.AvatarUrl, u.LastLectureID, u._created as created, c.CurriculumID, c.Title as Course, r.Title, r.Access FROM USERS as u INNER JOIN Roles as r ON r.RoleID = u.RoleID INNER JOIN classlist as cl ON cl.UserID = u.UserID INNER JOIN courses as c ON c.CourseID = cl.CourseID WHERE u.UserID = ?",
    [userid]
  );
};

const findOneUserByEmail = (email: string) => {
  return Query(
    "SELECT u.UserID, u.FirstName, u.LastName, u.email, u.password, u.RoleID, u.AvatarUrl, u.LastLectureID, r.Title, r.Access FROM USERS as u INNER JOIN Roles as r ON r.RoleID = u.RoleID WHERE u.email = ?",
    [email]
  );
};

const insertUser = (user: any) => {
  return Query("INSERT INTO Users SET ?", [user]);
};

const insertUserToCourseList = (record: any) => {
  return Query("INSERT INTO ClassList SET ?", [record]);
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
  getOneUserById,
  insertUser,
  insertUserToCourseList,
  updateUser,
  removeUser,
};
