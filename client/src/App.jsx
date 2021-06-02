import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';
import Routes from './routes/Routes';
import ApiClient from './utils/apiClient';
import './App.scss';
import { setUser } from './store/auth/reducers/authReducer';
import { useDispatch } from "react-redux";
import { setModules } from "./store/module/moduleReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  useEffect(() => {
    const controller = new AbortController();
    const fetchModules = async (controller, user) => {
      const apiClient = new ApiClient();
      const curriculumId = user.curriculumId || 1;
      const moduleResponse = await apiClient.get(`/curriculum/${ curriculumId }/module`);
      dispatch(setModules(moduleResponse));
    };

    if (user) {
      dispatch(setUser(user));
      fetchModules(controller, user);
    }
  }, [user, dispatch]);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
      <Router>
        <Routes />
        {/*<Switch>*/}
        {/*  <Route exact path="/login">*/}
        {/*    <DefaultLayout>*/}
        {/*      <Login />*/}
        {/*    </DefaultLayout>*/}
        {/*  </Route>*/}
        {/*  <Route exact path="/update/:token&:UserID">*/}
        {/*    <DefaultLayout>*/}
        {/*      <SignUp />*/}
        {/*    </DefaultLayout>*/}
        {/*  </Route>*/}
        {/*  {user ? (*/}
        {/*    <>*/}
        {/*      <Route exact path="/">*/}
        {/*        <DefaultLayout>*/}
        {/*          <Dashboard*/}
        {/*            course={user.course}*/}
        {/*            lastLectureId={user.lastLectureId}*/}
        {/*            firstName={user.firstName}*/}
        {/*          />*/}
        {/*        </DefaultLayout>*/}
        {/*      </Route>*/}
        {/*      <Route exact path="/1-on-1">*/}
        {/*        <DefaultLayout>*/}
        {/*          <Tutoring course={user.course} />*/}
        {/*        </DefaultLayout>*/}
        {/*      </Route>*/}
        {/*      <Route exact path="/career-services">*/}
        {/*        <DefaultLayout>*/}
        {/*          <CareerServices course={user.course} />*/}
        {/*        </DefaultLayout>*/}
        {/*      </Route>*/}
        {/*      <Route exact path="/learn">*/}
        {/*        <LectureLayout*/}
        {/*          modules={Array.isArray(modules) ? modules : [modules]}*/}
        {/*          lectures={lectures}>*/}
        {/*          <Home />*/}
        {/*        </LectureLayout>*/}
        {/*      </Route>*/}
        {/*      <Route exact path="/profile">*/}
        {/*        <DefaultLayout>*/}
        {/*          <Profile />*/}
        {/*        </DefaultLayout>*/}
        {/*      </Route>*/}
        {/*      <Route exact path="/admin">*/}
        {/*        {user?.role?.title == "Admin" || user?.role?.title == "Instructor" ? (*/}
        {/*          <AdminLayout>*/}
        {/*            <AdminDashboard />*/}
        {/*          </AdminLayout>*/}
        {/*        ) : (*/}
        {/*          <Redirect from="/admin" to="/" />*/}
        {/*        )}*/}
        {/*      </Route>*/}
        {/*      <Route exact path="/admin/add-edit">*/}
        {/*        {user?.role?.title === "Admin" || user?.role?.title === "Instructor" ? (*/}
        {/*          <DefaultLayout>*/}
        {/*            <AdminEdit />*/}
        {/*          </DefaultLayout>*/}
        {/*        ) : (*/}
        {/*          <Redirect from="/admin-edit" to="/" />*/}
        {/*        )}*/}
        {/*      </Route>*/}
        {/*      {lectures && lectures.map((lecture, i, arr) => {*/}
        {/*        const path = lecture.title.toLowerCase().replace(/ /g, "-");*/}
        {/*        return (*/}
        {/*          <Route*/}
        {/*            key={lecture.id + "route"}*/}
        {/*            exact*/}
        {/*            path={`/learn/${path}`}>*/}
        {/*            <LectureLayout*/}
        {/*              modules={modules}*/}
        {/*              lectures={lectures}>*/}
        {/*              <LectureContent*/}
        {/*                userId={user.id}*/}
        {/*                title={lecture.title}*/}
        {/*                nextId={*/}
        {/*                  i < arr.length - 1 ? arr[i + 1].lectureId : arr[i].lectureId*/}
        {/*                }*/}
        {/*                previousLecture={*/}
        {/*                  i && i < arr.length ? arr[i - 1].title : arr[i].title*/}
        {/*                }*/}
        {/*                nextLecture={*/}
        {/*                  i < arr.length - 1 ? arr[i + 1].title : arr[i].title*/}
        {/*                }*/}
        {/*                lectureId={lecture.id}*/}
        {/*                quiz={lecture.Quiz}*/}
        {/*              />*/}
        {/*            </LectureLayout>*/}
        {/*          </Route>*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </>*/}
        {/*  ) : (*/}
        {/*    <Redirect from="*" to="/login" />*/}
        {/*  )}*/}
        {/*</Switch>*/}
      </Router>
  );
};

export default App;
