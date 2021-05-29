import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import ApiClient from "../utils/apiClient";

const AdminCreateBulk: React.FC<IAdminCreateBulkProps> = ({
  courses,
  roles,
}) => {
  const apiClient = new ApiClient();
  const [role, setRole] = React.useState("");
  const [course, setCourse] = React.useState("");

  const insertUsersBulk = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    let form: any = document.querySelector("input[type=file]");
    let alertDiv = document.getElementById("errorAlert");
    let fileList = form.files;

    if (fileList.length > 0) {
      try {
        const formData = new FormData();
        formData.append("csv", fileList[0]);
        formData.append("RoleID", role);
        formData.append("CourseID", course);
        const bulkRegisterResponse = await apiClient.post("/auth/bulk-register", 
          formData, {
            headers: {
              encoding: "binary",
            }
          }
        );

        if (bulkRegisterResponse) {
          alertDiv.classList.remove("alert-danger");
          alertDiv.classList.add("alert-success");
          alertDiv.innerHTML = "User Created!";
          alertDiv.style.display = "block";
          setTimeout(() => (alertDiv.style.display = "none"), 10000);
        } else {
          alertDiv.classList.remove("alert-success");
          alertDiv.classList.add("alert-danger");
          alertDiv.innerHTML = "Failed to create User!";
          alertDiv.style.display = "block";
          setTimeout(() => (alertDiv.style.display = "none"), 10000);
        }
      } catch (err) {
        throw err;
      }
    } else {
      alertDiv.classList.remove("alert-success");
      alertDiv.classList.add("alert-danger");
      alertDiv.innerHTML = "No file selected!";
      alertDiv.style.display = "block";
      setTimeout(() => (alertDiv.style.display = "none"), 10000);
    }
  };

  return (
    <Col className="col-md-6 p-4">
      <h3 className="text-center">Create In Bulk</h3>
      <Form onSubmit={insertUsersBulk}>
        <Form.Group className="p-3">
          <div className="mb-3">
            <Form.Label>CSV File:</Form.Label>
            <Form.File
              name="uploadFile"
              className="custom-file-input"
              id="fileInput"
              accept="text/csv"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                document.getElementById("fileLabel").innerHTML =
                  e.target.value.slice(12);
              }}
            />
            <Form.Label id="fileLabel" className="custom-file-label">
              Choose file
            </Form.Label>
          </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role:</Form.Label>
            <Form.Control
              type="text"
              placeholder="User Role"
              value={role}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRole(e.target.value)
              }
              list="user-roles"
            />
            <datalist id="user-roles">
              {roles.map((r) => {
                return (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                );
              })}
            </datalist>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Course:</Form.Label>
            <Form.Control
              type="text"
              placeholder="User Course"
              value={course}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCourse(e.target.value)
              }
              list="courses"
            />
            <datalist id="courses">
              {courses.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                );
              })}
            </datalist>
          </Form.Group>
          <Button
            variant="info"
            className="w-50 mx-auto d-block my-3"
            type="submit">
            Create
          </Button>
      </Form>
    </Col>
  );
};

interface IAdminCreateBulkProps {
  courses: any[];
  roles: any[];
}

export default AdminCreateBulk;
