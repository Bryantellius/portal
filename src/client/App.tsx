import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./views/Login";
import TopicContent from "./views/TopicContent";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { apiService, abortFetching, User } from "./utils/apiService";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(
    User ? true : false
  );
  const [modules, setModules] = React.useState<any[]>([]);
  const [topics, setTopics] = React.useState<any[]>([]);
  const [user, setUser] = React.useState<any>({});

  React.useEffect(() => {
    let controller = new AbortController();
    if (isLoggedIn) {
      fetchUser(controller);
    }

    return () => abortFetching(controller);
  }, [isLoggedIn]);

  const fetchUser = async (controller: any) => {
    let [res] = await apiService(
      `/api/users/${User.UserID}`,
      false,
      "GET",
      controller.signal
    );
    setUser(res);
      console.log(res);
    await fetchModules(controller, res);
    await fetchTopics(controller, res);
  };

  const fetchModules = async (controller: any, user: any) => {
    let CurriculumID: number = user.CurriculumID || 1;
    let res = await apiService(
      `/api/resources/modules/${CurriculumID}`,
      false,
      "GET",
      controller.signal
    );
    setModules(res);
  };

  const fetchTopics = async (controller: any, user: any) => {
    let CurriculumID: number = user.CurriculumID || 1;
    let res = await apiService(
      `/api/resources/topics/${CurriculumID}`,
      false,
      "GET",
      controller.signal
    );
    setTopics(res);
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
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Layout
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isLoggedIn={isLoggedIn}
                showSidebar
                modules={modules}
                topics={topics}
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
            {topics.map((topic) => {
              let path: string = topic.Title.toLowerCase().replace(/ /g, "-");
              return (
                <Route key={topic.TopicID + "route"} exact path={`/${path}`}>
                  <Layout
                    setIsLoggedIn={setIsLoggedIn}
                    user={user}
                    isLoggedIn={isLoggedIn}
                    showSidebar
                    modules={modules}
                    topics={topics}
                  >
                    <TopicContent title={topic.Title} topicId={topic.TopicID} />
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
