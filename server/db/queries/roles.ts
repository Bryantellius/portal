import Query from "../query";

const getAllRoles = () => {
  return Query("SELECT * FROM ROLES");
};

export default { getAllRoles };
