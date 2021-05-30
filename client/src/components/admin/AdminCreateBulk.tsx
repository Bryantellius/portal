import React, { FunctionComponent, useState, ChangeEvent } from "react";
import { Button, Col, Form } from "react-bootstrap";
import ApiClient from "../../utils/apiClient";

interface IAdminCreateBulkProps {
  courses: any[];
  roles: any[];
}

const AdminCreateBulk: FunctionComponent<IAdminCreateBulkProps> = ({
  courses,
  roles
}) => {
  const apiClient = new ApiClient();
  const [role, setRole] = useState("");
  const [course, setCourse] = useState("");
  const [uploaderLabel, setUploaderLabel] = useState("Choose a file..");

  const insertUsersBulk = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form: any = document.querySelector("input[type=file]");
    const fileList = form.files;

    if (fileList.length > 0) {
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUploaderLabel(e.target.value.slice(12));
              }}
            />
            <Form.Label id="fileLabel" className="custom-file-label">
              {uploaderLabel}
            </Form.Label>
          </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role:</Form.Label>
            <Form.Control
              type="text"
              placeholder="User Role"
              value={role}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
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

export default AdminCreateBulk;
