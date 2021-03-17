import Query from "../models";

const getAllModulesByCurriculum = (id: number) => {
  return Query("SELECT * FROM Modules WHERE CurriculumID = ?", [id]);
};

const getOneModuleByTopicID = (id: number) => {
  return Query("SELECT * FROM Modules WHERE TopicID = ?", [id]);
};

const getAllModules = () => {
  return Query("SELECT * FROM Modules");
};

const insertModule = (body: any) => {
  return Query("INSERT INTO Modules SET ?", [body]);
};

export default {
  getAllModulesByCurriculum,
  getOneModuleByTopicID,
  getAllModules,
  insertModule,
};
