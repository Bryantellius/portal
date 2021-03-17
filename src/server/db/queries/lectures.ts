import Query from "../models";

const getOneLecture = (id: number) => {
  return Query("SELECT * FROM Lectures WHERE LectureID = ?", [id]);
};

const getOneLectureByTopicID = (id: number) => {
  return Query("SELECT * FROM Lectures WHERE TopicID = ?", [id]);
};

const getAllLectures = () => {
  return Query("SELECT * FROM Lectures");
};

const insertLecture = (body: any) => {
  return Query("INSERT INTO Lectures SET ?", [body]);
};

export default {
  getOneLecture,
  getOneLectureByTopicID,
  getAllLectures,
  insertLecture,
};
