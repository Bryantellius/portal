import React from "react";
import { NavLink } from "react-router-dom";

const Admin: React.FC<IAdminProps> = () => {
  return (
    <div className="profile-settings mx-auto">
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Admin View</h1>
            <p className="text-muted text-center">What are you looking for?</p>
          </div>
          <div className="col-md-6">
            <div className="card shadow bg-light h-100">
              <img
                src="../assets/svg/admin-view.svg"
                alt="One On One's"
                className="card-img-top"
              />
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center">
                  <NavLink
                    className="btn btn-lg btn-outline-primary"
                    to="/admin/view"
                  >
                    View
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow bg-light h-100">
              <img
                src="../assets/svg/admin-edit.svg"
                alt="One On One's"
                className="card-img-top"
              />
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center">
                  <NavLink
                    className="btn btn-lg btn-outline-primary"
                    to="/admin/add-edit"
                  >
                    Add/Edit
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IAdminProps {}

export default Admin;
