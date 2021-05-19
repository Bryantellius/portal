import Query from "../models";

const getAllCourses = () => {
  return Query("SELECT * FROM Courses");
};

export default { getAllCourses };
