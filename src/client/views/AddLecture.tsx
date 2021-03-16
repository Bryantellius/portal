import * as React from "react";
import { apiService } from "../utils/apiService";

const AddLecture = () => {
  const [feedback, setFeedback] = React.useState<string>("");
  const [Title, setTitle] = React.useState<string>("");
  const [TopicID, setTopicID] = React.useState<number>(1);
  const [topics, setTopics] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    let res = await apiService("/api/topics");
    if (res) {
      setTopics(res);
    }
  };

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form: any = document.querySelector("input[type=file]");
    const fileList: any = form.files;
    const fileName: any = document.getElementById(
      "fileInput"
    ) as HTMLInputElement;

    const formData = new FormData();
    formData.append("image", fileList[0]);
    fetch("/api/admin/lectures", {
      method: "POST",
      headers: {
        encoding: "binary",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(async (res) => {
        if (res) {
          let body = {
            Title,
            TopicID,
            filePath: res
              ? `../src/server/lectures/${fileName.value.slice(12)}`
              : null,
          };

          let data = await apiService("/api/admin/add/lecture", "POST", body);
          if (data) {
            setFeedback("Successfully added lecture.");
          } else {
            console.log(data);
            setFeedback(
              "An error occurred while adding the lecture. Try again or contact support."
            );
          }
        }
      });
  };

  return (
    <main className="container">
      <h1 className="text-center">Add Lecture</h1>
      <div className="row">
        <div className="card col-sm-6 mx-auto">
          <p className="text-center">{feedback}</p>
          <form className="form" onSubmit={formSubmit}>
            <div className="form-group">
              <label htmlFor="lectureName">Lecture Title:</label>
              <input
                className="form-control"
                type="text"
                name="lectureName"
                id="lectureName"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lectureTopicID">Lecture Topic:</label>
              <select
                className="form-control"
                name="lectureTopicID"
                id="lectureTopicID"
                onChange={(e) => setTopicID(Number(e.target.value))}
              >
                {topics.map((Topic) => {
                  return (
                    <option value={Topic.TopicID} key={Topic.TopicID}>
                      {Topic.Title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label>Markdown File:</label>
              <div className="custom-file">
                <input
                  type="file"
                  name="uploadFile"
                  className="custom-file-input"
                  id="fileInput"
                  accept=".md"
                  onChange={(e) => {
                    document.getElementById(
                      "fileLabel"
                    ).innerHTML = e.target.value.slice(12);
                  }}
                />
                <label id="fileLabel" className="custom-file-label">
                  Choose file
                </label>
              </div>
            </div>
            <div className="form-group">
              <input className="form-control" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddLecture;
