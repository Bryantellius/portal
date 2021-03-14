import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import GitIntro from "./views/GitIntro";
import Home from "./views/Home";

const App: React.FC = () => {
  return (
    <Router>
      <main className="docs">
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
          </Switch>
        </div>
      </main>
    </Router>
  );
};

export default App;
