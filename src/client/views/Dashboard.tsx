import React from "react";
import { NavLink } from "react-router-dom";
import { apiService } from "../utils/apiService";

const Dashboard: React.FC<IDashboardProps> = ({ course, LastLectureID }) => {
  const [lastLecture, setLastLecture] = React.useState(null);

  React.useEffect(() => {
    if (!lastLecture) {
      fetchLastLectureInfo();
    }
  });

  const fetchLastLectureInfo = async () => {
    let [data]: any = await apiService(
      `/api/resources/lectures-info/${LastLectureID ? LastLectureID : 1}`,
      false
    );
    if (data) {
      console.log(data);
      setLastLecture(data);
    }
  };

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
              <div className="card-header">
                <h4>{lastLecture ? lastLecture.Title : "Loading..."}</h4>
              </div>
              <div className="card-body">
                <NavLink
                  to={
                    lastLecture
                      ? `/learn/${lastLecture.Title.toLowerCase().replace(
                          / /g,
                          "-"
                        )}`
                      : "/learn"
                  }
                  className="btn btn-sm btn-outline-primary"
                >
                  RESUME
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h4>Tutoring</h4>
              </div>
              <div className="card-body">
                <NavLink to={"/1-on-1"} className="btn btn-sm btn-outline-primary">
                  Schedule
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h4>Career Services</h4>
              </div>
              <div className="card-body">
                <NavLink to={"/schedule"} className="btn btn-sm btn-outline-primary">
                  Calendar
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IDashboardProps {
  course: string;
  LastLectureID: number;
}

export default Dashboard;
