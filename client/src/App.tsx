import React, { FunctionComponent, useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { DefaultLayout, LectureLayout, AdminLayout } from "./layouts"
import Login from "./views/Login"
import LectureContent from "./views/LectureContent"
import Home from "./views/Home"
import Profile from "./views/Profile"
import Admin from "./views/Admin"
import Dashboard from "./views/Dashboard"
import Tutoring from "./views/Tutoring"
import CareerServices from "./views/CareerServices"
import AdminEdit from "./views/AdminEdit"
import SignUp from "./views/SignUp"
import ApiClient from "./utils/apiClient"
import { AuthContext, initialAuthState, useAuth } from "./context/auth"
import "./App.scss"
import { useLocalStorageState } from "./store"

const App: FunctionComponent = () => {
  const apiClient = new ApiClient()
  const [modules, setModules] = useState<any[]>([])
  const [lectures, setLectures] = useState<any[]>([])
  const [user, setUser] = useLocalStorageState('user')
  const [token, setToken] = useLocalStorageState('token')

  useEffect(() => {
    const controller = new AbortController()
    if (user) {
      setUser(user)
      fetchUser(controller)
    }
  }, [])

  const fetchUser = async (controller: any) => {
    const userResponse = await apiClient.get(`/user/${initialAuthState?.user?.id}`)
    setUser(userResponse)
    auth.setUser(userResponse)

    fetchModules(controller, userResponse)
    fetchLectures(controller, userResponse)
  }

  const fetchModules = async (controller: any, user: any) => {
    const curriculumId = user.curriculumId || 1
    const moduleResponse = await apiClient.get(`/curriculum/${ curriculumId }/module`)
    setModules(moduleResponse)
  }

  const fetchLectures = async (controller: any, user: any) => {
    const curriculumId = user.curriculumId || 1
    const lectures = await apiClient.get(`/curriculum/${ curriculumId }/lecture`)
    setLectures(lectures)
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <DefaultLayout
            user={user}>
            <Login />
          </DefaultLayout>
        </Route>
        <Route exact path="/update/:token&:UserID">
          <DefaultLayout
            user={user}>
            <SignUp />
          </DefaultLayout>
        </Route>
        {user ? (
          <>
            <Route exact path="/">
              <DefaultLayout
                user={user}>
                <Dashboard
                  course={user.course as string}
                  lastLectureId={user.lastLectureId}
                  firstName={user.firstName}
                />
              </DefaultLayout>
            </Route>
            <Route exact path="/1-on-1">
              <DefaultLayout
                user={user}>
                <Tutoring course={user.course as string} />
              </DefaultLayout>
            </Route>
            <Route exact path="/career-services">
              <DefaultLayout
                user={user}>
                <CareerServices course={user.course as string} />
              </DefaultLayout>
            </Route>
            <Route exact path="/learn">
              <LectureLayout
                user={user}
                modules={Array.isArray(modules) ? modules : [modules]}
                lectures={lectures}>
                <Home />
              </LectureLayout>
            </Route>
            <Route exact path="/profile">
              <DefaultLayout
                user={user}>
                <Profile user={user} />
              </DefaultLayout>
            </Route>
            <Route exact path="/admin">
              {user?.Role?.title == "Admin" || user?.Role?.title == "Instructor" ? (
                <AdminLayout
                  user={user}>
                  <Admin />
                </AdminLayout>
              ) : (
                <Redirect from="/admin" to="/" />
              )}
            </Route>
            <Route exact path="/admin/add-edit">
              {role === "Admin" || role === "Instructor" ? (
                <DefaultLayout
                  user={user}>
                  <AdminEdit />
                </DefaultLayout>
              ) : (
                <Redirect from="/admin-edit" to="/" />
              )}
            </Route>
            {lectures && lectures.map((lecture, i, arr) => {
              const path = lecture.title.toLowerCase().replace(/ /g, "-")
              return (
                <Route
                  key={lecture.id + "route"}
                  exact
                  path={`/learn/${path}`}>
                  <LectureLayout
                    user={user}
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
              )
            })}
          </>
        ) : (
          <Redirect from="*" to="/login" />
        )}
      </Switch>
    </Router>
  )
}

export default App
