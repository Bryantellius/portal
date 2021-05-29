import React, { FunctionComponent, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./views/Login";
import LectureContent from "./views/LectureContent";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Admin from "./views/Admin";
import Dashboard from "./views/Dashboard";
import Tutoring from "./views/Tutoring";
import CareerServices from "./views/CareerServices";
import AdminEdit from "./views/AdminEdit";
import SignUp from "./views/SignUp";
import ApiClient from "./utils/apiClient";
import AuthService from "./utils/authService";

const App: FunctionComponent = () => {
  const apiClient = new ApiClient();
  const authService = new AuthService();

  const storedUser = authService.getUser();

  const [modules, setModules] = useState<any[]>([]);
  const [lectures, setLectures] = useState<any[]>([]);
  const [user, setUser] = useState<any>(storedUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(storedUser !== undefined);

  useEffect(() => {
    let controller = new AbortController();
    if (isLoggedIn) {
      fetchUser(controller);
    }
  }, [isLoggedIn]);

  const fetchUser = async (controller: any) => {
    const userResponse = await apiClient.get(`/user/${storedUser.id}`);
    setUser(userResponse);
    fetchModules(controller, userResponse);
    fetchLectures(controller, userResponse);
  };

  const fetchModules = async (controller: any, user: any) => {
    const curriculumId = user.curriculumId || 1;
    const moduleResponse = await apiClient.get(`/curriculum/${ curriculumId }/module`);
    setModules(moduleResponse);
  };

  const fetchLectures = async (controller: any, user: any) => {
    const curriculumId = user.curriculumId || 1;
    const lectures = await apiClient.get(`/curriculum/${ curriculumId }/lecture`);
    setLectures(lectures);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Layout
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            isLoggedIn={isLoggedIn}
            showSidebar={false}>
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Layout>
        </Route>
        <Route exact path="/update/:token&:UserID">
          <Layout
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            isLoggedIn={isLoggedIn}
            showSidebar={false}>
            <SignUp setIsLoggedIn={setIsLoggedIn} />
          </Layout>
        </Route>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Layout
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isLoggedIn={isLoggedIn}
                showSidebar={false}>
                <Dashboard
                  course={user.course}
                  lastLectureId={user.lastLectureId}
                  firstName={user.firstName}
                />
              </Layout>
            </Route>
            <Route exact path="/1-on-1">
              <Layout
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isLoggedIn={isLoggedIn}
                showSidebar={false}>
                <Tutoring course={user.course} />
              </Layout>
            </Route>
            <Route exact path="/career-services">
              <Layout
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isLoggedIn={isLoggedIn}
                showSidebar={false}>
                <CareerServices course={user.course} />
              </Layout>
            </Route>
            <Route exact path="/learn">
              <Layout
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isLoggedIn={isLoggedIn}
                showSidebar
                modules={Array.isArray(modules) ? modules : [modules]}
                lectures={lectures}>
                <Home />
              </Layout>
            </Route>
            <Route exact path="/profile">
              <Layout
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isLoggedIn={isLoggedIn}
                showSidebar={false}>
                <Profile user={user} />
              </Layout>
            </Route>
            <Route exact path="/admin">
              {user.title == "Admin" || user.title == "Instructor" ? (
                <Layout
                  setIsLoggedIn={setIsLoggedIn}
                  user={user}
                  showSidebar={false}
                  isLoggedIn={isLoggedIn}>
                  <Admin />
                </Layout>
              ) : (
                <Redirect from="/admin" to="/" />
              )}
            </Route>
            <Route exact path="/admin/add-edit">
              {user.title == "Admin" || user.title == "Instructor" ? (
                <Layout
                  setIsLoggedIn={setIsLoggedIn}
                  user={user}
                  showSidebar={false}
                  isLoggedIn={isLoggedIn}>
                  <AdminEdit />
                </Layout>
              ) : (
                <Redirect from="/admin-edit" to="/" />
              )}
            </Route>
            {lectures && lectures.map((lecture, i, arr) => {
              const path = lecture.title.toLowerCase().replace(/ /g, "-");
              return (
                <Route
                  key={lecture.id + "route"}
                  exact
                  path={`/learn/${path}`}>
                  <Layout
                    setIsLoggedIn={setIsLoggedIn}
                    user={user}
                    isLoggedIn={isLoggedIn}
                    showSidebar
                    modules={modules}
                    lectures={lectures}>
                    <LectureContent
                      userId={user.id}
                      title={lecture.title}
                      nextId={
                        i < arr.length - 1 ? arr[i + 1].lectureId : arr[i].lectureId
                      }
                      previousLecture={
                        i && i < arr.length ? arr[i - 1].Title : arr[i].title
                      }
                      nextLecture={
                        i < arr.length - 1 ? arr[i + 1].Title : arr[i].title
                      }
                      lectureId={lecture.id}
                      quiz={lecture.Quiz} 
                    />
                  </Layout>
                </Route>
              );
            })}
          </>
        ) : (
          <Redirect from="*" to="/login" />
        )}
      </Switch>
    </Router>
  );
};

export default App;
