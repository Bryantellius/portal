import React from "react";
import { apiService } from "../utils/apiService";

const AdminEdit: React.FC<IAdminEditProps> = () => {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");
  const [course, setCourse] = React.useState("");
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

  const insertUser = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      user: {
        FirstName: firstname,
        LastName: lastname,
        email,
        password,
        RoleID: role,
      },
      classlist: {
        CourseID: course,
      },
    };
    
    let insertResponse: any = await apiService(
      "/api/users",
      false,
      "POST",
      controller.signal,
      body
    );

    let alertDiv = document.getElementById("errorAlert");

    if (insertResponse) {
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
  };

  return (
    <div className="profile-settings mx-auto">
      <div className="container">
        <h1>Select an Option</h1>
        <section className="row my-2 justify-content-center">
          <div className="col-md-6 d-flex flex-column justify-content-start align-items-center">
            <h1 className="text-center">Create a User</h1>
          </div>
        </section>
        <section className="container p-4">
          <div id="errorAlert" className="alert alert-danger">
            Error. Try again.
          </div>
          <form
            className="form-group col-xl-8 mx-auto p-3"
            onSubmit={insertUser}
          >
            <div className="mb-3">
              <label htmlFor="firstName">First Name:</label>
              <input
                name="firstName"
                id="firstName"
                type="text"
                className="form-control mb-2"
                placeholder="User Firstname"
                value={firstname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstname(e.target.value)
                }
                required
              />
              <label htmlFor="lastName">Last Name:</label>
              <input
                name="lastName"
                id="lastName"
                type="text"
                className="form-control"
                placeholder="User Lastname"
                value={lastname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLastname(e.target.value)
                }
                required
              />
            </div>
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="User Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                autoComplete="off"
                required
              />
            </div>
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="User Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                autoComplete="off"
                required
              />
            </div>
            <div className="mb-3">
              <label>Role:</label>
              <input
                type="text"
                className="form-control"
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
                    <option key={r.RoleID} value={r.RoleID}>
                      {r.Title}
                    </option>
                  );
                })}
              </datalist>
            </div>
            <div className="mb-3">
              <label>Course:</label>
              <input
                type="text"
                className="form-control"
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
                    <option key={c.CourseID} value={c.CourseID}>
                      {c.Title}
                    </option>
                  );
                })}
              </datalist>
            </div>
            <button
              className="btn btn-info w-50 mx-auto d-block my-3"
              type="submit"
            >
              Create
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

interface IAdminEditProps {}

export default AdminEdit;
