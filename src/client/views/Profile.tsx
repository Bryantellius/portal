import * as React from "react";
import moment from "moment";
import ApiClient from "../utils/apiClient";

const Profile: React.FC<IProfileProps> = ({ user }) => {
  const controller = new AbortController();
  const apiClient = new ApiClient();

  const [email, setEmail] = React.useState<string>(user.email);
  const [firstname, setFirstname] = React.useState<string>(user.firstName);
  const [lastname, setLastname] = React.useState<string>(user.lastName);

  const updateUser = async (e: any) => {
    e.preventDefault();

    const alertDiv = document.getElementById("memberAlert");
    if (firstname === "" || lastname === "" || email === "") {
      alertDiv.classList.remove("alert-success");
      alertDiv.classList.add("alert-danger");
      alertDiv.innerHTML = "All input fields must have values.";
      alertDiv.style.display = "block";
      setTimeout(() => (alertDiv.style.display = "none"), 10000);
      return;
    }

    const form: any = document.querySelector("input[type=file]");
    const fileList = form.files;
    const inputElement = document.getElementById(
      "fileInput"
    ) as HTMLInputElement;

    const body = {
      firstname,
      lastname,
      email,
      avatarUrl: `../assets/img/${user.id}`,
      fileName: `${inputElement.value.slice(12)}`,
    };

    if (fileList.length > 0) {
      const formData = new FormData();
      formData.append("image", fileList[0]);
      formData.append("id", user.id);
      const updateAssetsResponse = await apiClient.post(
        `/user/${ user.id }/assets`,
        formData, 
        {
          headers: {
            encoding: "binary",
          }
        }
      );
    } else {
      delete body.avatarUrl;
      delete body.fileName;
    }

    const updateUserResponse = await apiClient.put(`/user/${user.id}`, body);
    
    if (updateUserResponse.status === 200) {
      alertDiv.classList.remove("alert-danger");
      alertDiv.classList.add("alert-success");
      alertDiv.innerHTML = "Member Updated!";
      alertDiv.style.display = "block";
      setTimeout(() => (alertDiv.style.display = "none"), 10000);
    } else {
      alertDiv.classList.remove("alert-success");
      alertDiv.classList.add("alert-danger");
      alertDiv.innerHTML = "Failed to update Member!";
      alertDiv.style.display = "block";
      setTimeout(() => (alertDiv.style.display = "none"), 10000);
    }
  };

  return (
    <div className="profile-settings mx-auto">
      <div className="container card shadow mt-2">
        <section className="row my-2 justify-content-center">
          <div className="col-md-6 d-flex flex-column justify-content-start align-items-center">
            <img
              src={user.avatarUrl || "../assets/img/default.png"}
              alt={`${user.lastName} Profile Image`}
              className="avatar-2xl"
            />
            <h1 className="text-center">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-center">{user.title}</p>
            <small className="text-muted text-center d-block">
              Member since {moment(user.createdAt).format("MMM Do YYYY")}
            </small>
          </div>
        </section>
        <section className="container p-4">
          <div id="memberAlert" className="alert alert-danger">
            Error. Try again.
          </div>
          <form
            className="form-group col-xl-8 mx-auto p-3"
            onSubmit={updateUser}
          >
            <div className="mb-3">
              <label htmlFor="firstName">First Name:</label>
              <input
                name="firstName"
                id="firstName"
                type="text"
                className="form-control mb-2"
                placeholder="Member Firstname"
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
                placeholder="Member Lastname"
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
                placeholder="Member Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>
            <div className="mb-3">
              <label>Image:</label>
              <div className="custom-file">
                <input
                  type="file"
                  name="uploadFile"
                  className="custom-file-input"
                  id="fileInput"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    document.getElementById("fileLabel").innerHTML =
                      e.target.value.slice(12);
                  }}
                />
                <label id="fileLabel" className="custom-file-label">
                  Choose file
                </label>
              </div>
            </div>
            <button
              className="btn btn-info w-50 mx-auto d-block my-3"
              type="submit"
            >
              Update
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

interface IProfileProps {
  user: any;
}

export default Profile;
