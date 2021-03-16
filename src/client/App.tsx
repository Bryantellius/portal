import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import GitIntro from "./views/GitIntro";
import Home from "./views/Home";
import { darkModeLoader } from "./utils/theme";
import AddLecture from "./views/AddLecture";

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (isLoaded) {
      darkModeLoader();
    }
    setIsLoaded(true);
  }, [isLoaded]);

  return (
    <Router>
      <main className="docs">
        {/* Nav */}
        <Navbar />
        <div className="container-fluid container-docs">
          {/* Sidenav */}
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/git-intro">
              <GitIntro />
            </Route>
            <Route exact path="/admin/add/lecture">
              <AddLecture />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  );
};

export default App;
