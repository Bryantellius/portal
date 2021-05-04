import * as React from "react";

const Profile: React.FC<IProfileProps> = ({ user }) => {
  return (
    <div className="docs-content profile-settings">
      <div className="card mt-4">
        <div className="card-body">
          <div className="d-flex justify-content-center align-items-center">
            <img
              alt="Profile Image"
              src={user.AvatarUrl}
              className="rounded-circle avatar-2xl"
            />
          </div>
          <h1>
            {user.FirstName} {user.LastName}
          </h1>
          <p>{user.Title}</p>
          <hr />
          <h4>Update User Details</h4>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

interface IProfileProps {
  user: any;
}

export default Profile;
