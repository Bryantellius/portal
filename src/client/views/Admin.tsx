import React from "react";

const Admin: React.FC<IAdminProps> = () => {
  return (
    <div className="profile-settings mx-auto">
      <div className="container">
        <h1>Admin</h1>
        {/* <section className="row my-2 justify-content-center">
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
            <div className="mb-3">
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
            </div>
            <button
              className="btn btn-info w-50 mx-auto d-block my-3"
              type="submit"
            >
              Update
            </button>
          </form>
        </section> */}
      </div>
    </div>
  );
};

interface IAdminProps {}

export default Admin;
