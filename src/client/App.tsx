import React, { FunctionComponent, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./views/Login";
import LectureGroupContent from "./views/LectureGroupContent";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { apiService, abortFetching } from "./utils/apiService";
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

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
     storedUser ? true : false
  );

  const [modules, setModules] = useState<any[]>([]);
  const [lectureGroups, setLectureGroups] = useState<any[]>([]);
  const [user, setUser] = useState<any>(storedUser);

  useEffect(() => {
    let controller = new AbortController();
    if (isLoggedIn) {
      fetchUser(controller);
    }

    return () => abortFetching(controller);
  }, [isLoggedIn]);

  const fetchUser = async (controller: any) => {
    const userResponse = await apiClient.get(`/user/${storedUser.id}`);
    setUser(userResponse);
    fetchModules(controller, userResponse);
    fetchLectureGroups(controller, userResponse);
  };

  const fetchModules = async (controller: any, user: any) => {
    const curriculumId = user.curriculumId || 1;
    const moduleResponse = await apiClient.get(`/curriculum/${ curriculumId }/module`);
    setModules(moduleResponse);
  };

  const fetchLectureGroups = async (controller: any, user: any) => {
    const curriculumId = user.curriculumId || 1;
    const lectureGroups = await apiClient.get(`/curriculum/${ curriculumId }/lecture`);
    setLectureGroups(lectureGroups);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Layout
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            isLoggedIn={isLoggedIn}
            showSidebar={false}
          >
            <Login setIsLoggedIn={setIsLoggedIn} />
          </Layout>
        </Route>
        <Route exact path="/update/:token&:UserID">
          <Layout
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            isLoggedIn={isLoggedIn}
            showSidebar={false}
          >
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
                showSidebar={false}
              >
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
                showSidebar={false}
              >
                <Tutoring course={user.course} />
              </Layout>
            </Route>
            <Route exact path="/career-services">
              <Layout
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isLoggedIn={isLoggedIn}
                showSidebar={false}
              >
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
                lectureGroups={lectureGroups}
              >
                <Home />
              </Layout>
            </Route>
            <Route exact path="/profile">
              <Layout
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isLoggedIn={isLoggedIn}
                showSidebar={false}
              >
                <Profile user={user} />
              </Layout>
            </Route>
            <Route exact path="/admin">
              {user.title == "Admin" || user.title == "Instructor" ? (
                <Layout
                  setIsLoggedIn={setIsLoggedIn}
                  user={user}
                  showSidebar={false}
                  isLoggedIn={isLoggedIn}
                >
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
                  isLoggedIn={isLoggedIn}
                >
                  <AdminEdit />
                </Layout>
              ) : (
                <Redirect from="/admin-edit" to="/" />
              )}
            </Route>
            {lectureGroups && lectureGroups.map((lectureGroup, i, arr) => {
              const path = lectureGroup.title.toLowerCase().replace(/ /g, "-");
              return (
                <Route
                  key={lectureGroup.id + "route"}
                  exact
                  path={`/learn/${path}`}
                >
                  <Layout
                    setIsLoggedIn={setIsLoggedIn}
                    user={user}
                    isLoggedIn={isLoggedIn}
                    showSidebar
                    modules={modules}
                    lectureGroups={lectureGroups}
                  >
                    <LectureGroupContent
                      userId={user.id}
                      title={lectureGroup.title}
                      nextId={
                        i < arr.length - 1 ? arr[i + 1].lectureGroupId : arr[i].lectureGroupId
                      }
                      prevT={
                        i && i < arr.length ? arr[i - 1].Title : arr[i].title
                      }
                      nextT={
                        i < arr.length - 1 ? arr[i + 1].Title : arr[i].title
                      }
                      lectureGroupId={lectureGroup.id}
                      quiz={lectureGroup.Quiz}
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
