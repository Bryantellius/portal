import React from "react";
import AdminCreateBulk from "../components/AdminCreateBulk";
import AdminCreateSingle from "../components/AdminCreateSingle";
import { apiService } from "../utils/apiService";

const AdminEdit: React.FC<IAdminEditProps> = () => {
  const [roles, setRoles] = React.useState([]);
  const [courses, setCourses] = React.useState([]);

  const controller = new AbortController();

  React.useEffect(() => {
    fetchRoles();
    fetchCourses();
  }, []);

  const fetchRoles = async () => {
    let roles: any = await apiService(
      "/api/resources/roles",
      false,
      "GET",
      controller.signal
    );
    setRoles(roles);
  };

  const fetchCourses = async () => {
    let courses: any = await apiService(
      "/api/resources/courses",
      false,
      "GET",
      controller.signal
    );
    setCourses(courses);
  };

  return (
    <div className="profile-settings mx-auto">
      <div className="container">
        <h1 className="text-center">Create Users</h1>
        <div id="errorAlert" className="alert alert-danger">
          Error. Try again.
        </div>
        <section className="row">
          <AdminCreateBulk courses={courses} roles={roles} />
          <AdminCreateSingle courses={courses} roles={roles} />
        </section>
      </div>
    </div>
  );
};

interface IAdminEditProps {}

export default AdminEdit;
