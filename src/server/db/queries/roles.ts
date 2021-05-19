import Query from "../models";

const getAllRoles = () => {
  return Query("SELECT * FROM ROLES");
};

export default { getAllRoles };
