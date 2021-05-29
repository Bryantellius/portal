import React, { FunctionComponent, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { DefaultLayout, LectureLayout, AdminLayout } from "./layouts";
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
          <DefaultLayout
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            isLoggedIn={isLoggedIn}>
            <Login setIsLoggedIn={setIsLoggedIn} />
          </DefaultLayout>
        </Route>
        <Route exact path="/update/:token&:UserID">
          <DefaultLayout
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            isLoggedIn={isLoggedIn}>
            <SignUp setIsLoggedIn={setIsLoggedIn} />
          </DefaultLayout>
        </Route>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <DefaultLayout
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isLoggedIn={isLoggedIn}>
                <Dashboard
                  course={user.course}
                  lastLectureId={user.lastLectureId}
                  firstName={user.firstName}
                />
              </DefaultLayout>
            </Route>
            <Route exact path="/1-on-1">
              <DefaultLayout
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isLoggedIn={isLoggedIn}>
                <Tutoring course={user.course} />
              </DefaultLayout>
            </Route>
            <Route exact path="/career-services">
              <DefaultLayout
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isLoggedIn={isLoggedIn}>
                <CareerServices course={user.course} />
              </DefaultLayout>
            </Route>
            <Route exact path="/learn">
              <LectureLayout
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isLoggedIn={isLoggedIn}
                showSidebar
                modules={Array.isArray(modules) ? modules : [modules]}
                lectures={lectures}>
                <Home />
              </LectureLayout>
            </Route>
            <Route exact path="/profile">
              <DefaultLayout
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isLoggedIn={isLoggedIn}>
                <Profile user={user} />
              </DefaultLayout>
            </Route>
            <Route exact path="/admin">
              {user.Role.title == "Admin" || user.Role.title == "Instructor" ? (
                <AdminLayout
                  setIsLoggedIn={setIsLoggedIn}
                  user={user}
                  isLoggedIn={isLoggedIn}>
                  <Admin />
                </AdminLayout>
              ) : (
                <Redirect from="/admin" to="/" />
              )}
            </Route>
            <Route exact path="/admin/add-edit">
              {user.title == "Admin" || user.title == "Instructor" ? (
                <DefaultLayout
                  setIsLoggedIn={setIsLoggedIn}
                  user={user}
                  isLoggedIn={isLoggedIn}>
                  <AdminEdit />
                </DefaultLayout>
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
                  <LectureLayout
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
                  </LectureLayout>
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
