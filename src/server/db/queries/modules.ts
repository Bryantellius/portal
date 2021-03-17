import Query from "../models";

const getOneModule = (id: number) => {
  return Query("SELECT * FROM Modules WHERE ModuleID = ?", [id]);
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
  getOneModule,
  getOneModuleByTopicID,
  getAllModules,
  insertModule,
};
