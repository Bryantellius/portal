import React, { FunctionComponent } from "react";

const Tutoring: FunctionComponent<ITutoringProps> = ({ course }) => {
  return (
    <div className="profile-settings mx-auto">
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Schedule a Tutoring Appointment</h1>
          </div>
          <div className="col-md-6">
            <div className="card shadow bg-light h-100">
              <img
                src="../assets/svg/experts.svg"
                alt="One On One's"
                className="card-img-top"
              />
              <div className="card-header">
                <h1 className="text-center">
                  {course ? course + " Tutoring" : "Loading..."}
                </h1>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center">
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
          </div>
          <div className="col-md-6">
            <div className="card shadow h-100 bg-light">
              <div className="card-body">
                <iframe
                  className="iframeOnceHub w-100 h-100"
                  srcDoc={`
            <!-- ScheduleOnce embed START -->
<div id="SOIDIV_schedule-1-on-1-${
                    course?.includes("Node") ? "FSWD" : "FSSE"
                  }" data-so-page="schedule-1-on-1-${
                    course?.includes("Node") ? "FSWD" : "FSSE"
                  }" data-height="550" data-style="border: 1px solid #d8d8d8; min-width: 290px; max-width: 900px;" data-psz="00"></div>
<script type="text/javascript" src="https://cdn.oncehub.com/mergedjs/so.js"></script>
<!-- ScheduleOnce embed END -->
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

interface ITutoringProps {
  course: string;
}

export default Tutoring;
