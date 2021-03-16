import Query from "../models";

const getOneTopic = (id: number) => {
  return Query("SELECT TopicID, Title FROM Topics WHERE TopicID = ?", [
    id,
  ]);
};

const getAllTopics = () => {
  return Query("SELECT TopicID, Title FROM Topics");
};

const insertTopic = (body: any) => {
  return Query("INSERT INTO Topics SET ?", [body]);
};

export default {
  getOneTopic,
  getAllTopics,
  insertTopic,
};