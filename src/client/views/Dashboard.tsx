import React from "react";
import moment from "moment";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { apiService } from "../utils/apiService";

const Dashboard: React.FC<IDashboardProps> = ({
  course,
  LastLectureID,
  FirstName,
}) => {
  const [lastLecture, setLastLecture] = React.useState(null);

  const location = useLocation();

  const controller = new AbortController();

  React.useEffect(() => {
    if (LastLectureID) {
      fetchLastLectureInfo();
    }
  }, [LastLectureID, location.pathname]);

  const fetchLastLectureInfo = async () => {
    let [data]: any = await apiService(
      `/api/resources/lectures-info/${LastLectureID}`,
      false,
      "GET",
      controller.signal
    );
    if (data) {
      setLastLecture(data);
    }
  };

  return (
    <div className="profile-settings mx-auto">
      <div className="mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 text-center">
                    <p className="h4 h-100">Welcome back, {FirstName}!</p>
                  </div>
                  <div className="col-md-4 text-center">
                    <h1 className="h-100">{course}</h1>
                  </div>
                  <div className="col-md-4 text-center">
                    <p className="h-100">{moment().format("MMM DD yyyy")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow bg-light h-100">
              <img
                src="../assets/svg/learn.svg"
                alt="One On One's"
                className="card-img-top"
              />
              <div className="card-header">
                <h4>{lastLecture ? lastLecture.Title : "Lectures"}</h4>
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
            <div className="card shadow bg-light h-100">
              <img
                src="../assets/svg/experts.svg"
                alt="One On One's"
                className="card-img-top"
              />
              <div className="card-header">
                <h4>Tutoring</h4>
              </div>
              <div className="card-body">
                <NavLink
                  to={"/1-on-1"}
                  className="btn btn-sm btn-outline-primary"
                >
                  Schedule
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow bg-light h-100">
              <img
                src="../assets/svg/career-services.svg"
                alt="One On One's"
                className="card-img-top"
              />
              <div className="card-header">
                <h4>Career Services</h4>
              </div>
              <div className="card-body">
                <NavLink
                  to={"/career-services"}
                  className="btn btn-sm btn-outline-primary"
                >
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
  FirstName: string;
}

export default Dashboard;
