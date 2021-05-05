import Query from "../models";

const getOneTopic = (id: number) => {
  return Query("SELECT * FROM Topics WHERE TopicID = ?", [id]);
};

const getTopicsByCurriculum = (id: number) => {
  return Query(
    "select t.TopicID, t.ModuleID, t.Title, m.CurriculumID, m.Title as Module, m.ModuleID from topics as t INNER JOIN modules as m ON m.ModuleID = t.ModuleID WHERE m.CurriculumID = ?",
    [id]
  );
};

const insertTopic = (body: any) => {
  return Query("INSERT INTO Topics SET ?", [body]);
};

export default {
  getOneTopic,
  getTopicsByCurriculum,
  insertTopic,
};
