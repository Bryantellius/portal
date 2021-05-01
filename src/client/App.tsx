import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./views/Login";
import TopicContent from "./views/TopicContent";
import Home from "./views/Home";
import { darkModeLoader } from "./utils/theme";
import { apiService, abortFetching } from "./utils/apiService";

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [modules, setModules] = React.useState<any[]>([]);
  const [topics, setTopics] = React.useState<any[]>([]);

  React.useEffect(() => {
    let controller = new AbortController();
    if (!isLoaded) {
      darkModeLoader();
      fetchModules(controller);
      fetchTopics(controller);
    }
    setIsLoaded(true);
    return () => abortFetching(controller);
  }, []);

  const fetchModules = async (controller: any) => {
    let CurriculumID: number = 1;
    let res = await apiService(
      `/api/resources/modules/${CurriculumID}`,
      false,
      "GET",
      controller.signal
    );
    setModules(res);
  };

  const fetchTopics = async (controller: any) => {
    let res = await apiService(
      "/api/resources/topics",
      false,
      "GET",
      controller.signal
    );
    setTopics(res);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Layout showSidebar modules={modules} topics={topics}>
            <Home />
          </Layout>
        </Route>
        {topics.map((topic) => {
          let path: string = topic.Title.toLowerCase().replace(/ /g, "-");
          return (
            <Route key={topic.TitleID + "route"} exact path={`/${path}`}>
              <Layout showSidebar modules={modules} topics={topics}>
                <TopicContent title={topic.Title} topicId={topic.TopicID} />
              </Layout>
            </Route>
          );
        })}
        <Route exact path="/login">
          <Layout showSidebar={false}>
            <Login />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
