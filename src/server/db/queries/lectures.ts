import Query from "../models";

const getOneLecture = (id: number) => {
  return Query("SELECT * FROM Lectues WHERE LectureID = ?", [id]);
};

const getAllLectues = () => {
  return Query("SELECT LectureID, Title FROM Lectues");
};

const insertLecture = (body: any) => {
  return Query("INSERT INTO Lectues SET ?", [body]);
};

export default {
  getOneLecture,
  getAllLectues,
  insertLecture,
};
