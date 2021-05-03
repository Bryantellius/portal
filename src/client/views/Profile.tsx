import * as React from "react";
import { User } from "../utils/apiService";

const Profile: React.FC = () => {
  return (
    <div className="docs-content">
      <div className="card mt-4">
        <div className="card-body">
          <h1>
            {User.FirstName} {User.LastName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
