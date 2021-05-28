import React from "react";
import ApiClient from "../utils/apiClient";
const apiClient = new ApiClient();

const AdminCreateSingle: React.FC<IAdminCreateSingleProps> = ({
  roles,
  courses,
}) => {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [course, setCourse] = React.useState("");

  const controller = new AbortController();

  const insertUser = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      user: {
        firstName: firstname,
        lastName: lastname,
        email,
        roleID: role,
      },
      classList: {
        courseID: course,
      },
    };

    const insertResponse: any = await apiClient.post("/auth/register", body);

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
    <div className="col-md-6 p-4">
      <h3 className="text-center">Create Single</h3>
      <form className="form-group p-3" onSubmit={insertUser}>
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
                <option key={r.id} value={r.id}>
                  {r.title}
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
                <option key={c.id} value={c.id}>
                  {c.title}
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
    </div>
  );
};

interface IAdminCreateSingleProps {
  roles: any[];
  courses: any[];
}

export default AdminCreateSingle;
