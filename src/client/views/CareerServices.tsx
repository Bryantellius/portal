import moment from "moment";
import React from "react";

const CareerServices: React.FC<ICareerServicesProps> = ({ course }) => {
  return (
    <div className="profile-settings mx-auto">
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Career Services</h1>
          </div>
          <div className="col-md-6">
            <div className="card shadow bg-light h-100">
              <img
                src="../assets/svg/career-services.svg"
                alt="One On One's"
                className="card-img-top"
              />
              <div className="card-header">
                <h1 className="text-center">Career Services Calendar</h1>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 text-center">
                    {moment().day() == 3 || moment().day() == 5 ? (
                      <p>No Career Workshop Today!</p>
                    ) : (
                      <a
                        href="https://us02web.zoom.us/j/81193680506?pwd=dmUrREFYQjlGajJnUzVqb3Nkbmlvdz09"
                        target="_blank"
                        className="btn btn-outline-primary"
                      >
                        Join the Career Workshop
                      </a>
                    )}
                  </div>
                </div>
                <hr />
                <p className="p-2">
                  Need support? Contact{" "}
                  <a
                    className="supportEmail"
                    href="mailto:support@truecoders.io"
                  >
                    support@truecoders.io
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow h-100 bg-light">
              <div className="card-header">
                <h3 className="text-center">Schedule An Appointment</h3>
              </div>
              <div className="card-body">
                <iframe
                  className="w-100 h-100"
                  srcDoc={`
<div id="SOIDIV_1on1WJobPlacementProfessional" data-so-page="1on1WJobPlacementProfessional" data-height="550" data-style="border: 1px solid #d8d8d8; min-height: 500px; min-width: 290px; max-width: 900px;" data-psz="00"></div>
<script type="text/javascript" src="https://cdn.oncehub.com/mergedjs/so.js"></script>
          `}
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ICareerServicesProps {
  course: string;
}

export default CareerServices;
