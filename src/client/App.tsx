import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
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
      <main className="docs">
        {/* Nav */}
        <Navbar />
        <div className="container-fluid container-docs">
          {/* Sidenav */}
          <Sidebar modules={modules} topics={topics} />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {topics.map((topic) => {
              let path: string = topic.Title.toLowerCase().replace(/ /g, "-");
              return (
                <Route key={topic.TitleID + "route"} exact path={`/${path}`}>
                  <TopicContent title={topic.Title} topicId={topic.TopicID} />
                </Route>
              );
            })}
          </Switch>
        </div>
      </main>
    </Router>
  );
};

export default App;
