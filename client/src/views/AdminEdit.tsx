import React, { FunctionComponent, useState, useEffect } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import AdminCreateBulk from "../components/admin/AdminCreateBulk";
import AdminCreateSingle from "../components/admin/AdminCreateSingle";
import ApiClient from "../utils/apiClient";

const AdminEdit: FunctionComponent<IAdminEditProps> = () => {
  const apiClient = new ApiClient();
  const [roles, setRoles] = useState([]);
  const [courses, setCourses] = useState([]);

  const controller = new AbortController();

  useEffect(() => {
    fetchRoles();
    fetchCourses();
  }, []);

  const fetchRoles = async () => {
    const roles = await apiClient.get("/role");
    setRoles(roles);
  };

  const fetchCourses = async () => {
    const courses = await apiClient.get("/course");
    setCourses(courses);
  };

  return (
    <div className="profile-settings mx-auto">
      <Container>
        <h1 className="text-center">Create Users</h1>
        <Alert 
          id="errorAlert" 
          variant="danger">
          Error. Try again.
        </Alert>
        <Row as="section">
          <AdminCreateBulk courses={courses} roles={roles} />
          <AdminCreateSingle courses={courses} roles={roles} />
        </Row>
      </Container>
    </div>
  );
};

interface IAdminEditProps {}

export default AdminEdit;
