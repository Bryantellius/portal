import React from "react";

const Dashboard: React.FC<IDashboardProps> = ({ course }) => {
  return (
    <div className="profile-settings mx-auto">
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h1>{course}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">RESUME</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">SCHEDULE</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">CAREER SERVICES</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IDashboardProps {
  course: string;
}

export default Dashboard;
