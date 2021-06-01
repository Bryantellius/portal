import React, { FunctionComponent, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Routes from './routes/Routes';
import ApiClient from "./utils/apiClient";
import "./App.scss";
import { useAppDispatch } from './store/hooks';
import { setUser } from './store/auth/reducers/authReducer';

const App: FunctionComponent = () => {
  const apiClient = new ApiClient();
  const [modules, setModules] = useState<any[]>([]);
  const [lectures, setLectures] = useState<any[]>([]);
  const controller = new AbortController();
  const dispatch = useAppDispatch();
  // const user = useAppSelector(selectUser);
  // const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // useEffect(() => {
  //   let controller = new AbortController();
  //   if (isAuthenticated) {
  //     dispatch(getSignedInUser);
  //   }
  // }, []);

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null;

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
      fetchLectures(controller, user);
      fetchModules(controller, user);
    }
  }, []);

  if (!user) {
    return <Redirect to="/login" />;
  }

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
        {/*            course={user.course as string}*/}
        {/*            lastLectureId={user.lastLectureId}*/}
        {/*            firstName={user.firstName}*/}
        {/*          />*/}
        {/*        </DefaultLayout>*/}
        {/*      </Route>*/}
        {/*      <Route exact path="/1-on-1">*/}
        {/*        <DefaultLayout>*/}
        {/*          <Tutoring course={user.course as string} />*/}
        {/*        </DefaultLayout>*/}
        {/*      </Route>*/}
        {/*      <Route exact path="/career-services">*/}
        {/*        <DefaultLayout>*/}
        {/*          <CareerServices course={user.course as string} />*/}
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
