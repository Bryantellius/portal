import Query from "../query";

const getAllCourses = () => {
  return Query("SELECT * FROM Courses");
};

export default { getAllCourses };
