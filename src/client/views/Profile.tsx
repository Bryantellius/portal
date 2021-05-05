import * as React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

const Profile: React.FC<IProfileProps> = ({ user }) => {
  const history: any = useHistory();

  const [email, setEmail] = React.useState<string>("");
  const [firstname, setFirstname] = React.useState<string>("");
  const [lastname, setLastname] = React.useState<string>("");
  const [imageURL, setImageURL] = React.useState<string>("");

  const updateUser = async (e: any) => {
    e.preventDefault();

    console.log(firstname, lastname, email, imageURL);

    // let alertDiv = document.getElementById("memberAlert");
    // if (
    //   firstname === "" ||
    //   lastname === "" ||
    //   title === "" ||
    //   location === ""
    // ) {
    //   alertDiv.classList.remove("alert-success");
    //   alertDiv.classList.add("alert-danger");
    //   alertDiv.innerHTML = "All input fields must have values.";
    //   alertDiv.style.display = "block";
    //   setTimeout(() => (alertDiv.style.display = "none"), 10000);
    //   return;
    // }

    // let form: any = document.querySelector("input[type=file]");
    // let fileList = form.files;
    // const inputElement = document.getElementById(
    //   "fileInput"
    // ) as HTMLInputElement;
    // setImageURL(`/assets/${inputElement.value.slice(12)}`);

    // let body = {
    //   firstname,
    //   lastname,
    //   title,
    //   location,
    //   imageURL: `/assets/${inputElement.value.slice(12)}`,
    // };

    // try {
    //   const formData = new FormData();
    //   formData.append("image", fileList[0]);
    //   let res = await fetch("/api/assets", {
    //     method: "POST",
    //     headers: {
    //       encoding: "binary",
    //     },
    //     body: formData,
    //   });
    //   let msg = await res.json();
    // } catch (err) {
    //   throw err;
    // }

    // let res = await apiService(
    //   `/api/members/update_user/${params.id}`,
    //   "PUT",
    //   body
    // );
    // if (res) {
    //   alertDiv.classList.remove("alert-danger");
    //   alertDiv.classList.add("alert-success");
    //   alertDiv.innerHTML = "Member Updated!";
    //   alertDiv.style.display = "block";
    //   setTimeout(() => (alertDiv.style.display = "none"), 10000);
    // } else {
    //   alertDiv.classList.remove("alert-success");
    //   alertDiv.classList.add("alert-danger");
    //   alertDiv.innerHTML = "Failed to update Member!";
    //   alertDiv.style.display = "block";
    //   setTimeout(() => (alertDiv.style.display = "none"), 10000);
    // }
  };

  return (
    <div className="profile-settings mx-auto">
      <div className="container">
        <section className="row my-2 justify-content-center">
          <div className="col-md-6 d-flex flex-column justify-content-start align-items-center">
            <img
              src={user.AvatarUrl}
              alt={`${user.LastName} Profile Image`}
              className="avatar-2xl"
            />
            <h1 className="text-center">
              {user.FirstName} {user.LastName}
            </h1>
            <p className="text-center">{user.Title}</p>
            <small className="text-muted text-center d-block">
              Member since {moment(user.created).format("MMM Do YYYY")}
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
            {/* <div className="mb-3">
              <label>Location:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Member Location"
                value={location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value)
                }
              />
            </div> */}
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
                    document.getElementById(
                      "fileLabel"
                    ).innerHTML = e.target.value.slice(12);
                    setImageURL(`/assets/${e.target.value.slice(12)}`);
                  }}
                  required
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
