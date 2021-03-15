import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import GitIntro from "./views/GitIntro";
import Home from "./views/Home";

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (isLoaded) {
      darkModeLoader();
    }
    setIsLoaded(true);
  }, [isLoaded]);

  const darkModeLoader = () => {
    const toggleMode = document.getElementById("checkbox") as HTMLInputElement;
    const currentMode = localStorage.getItem("theme");
    if (currentMode) {
      document.documentElement.setAttribute("data-theme", currentMode);
      if (currentMode === "dark") {
        toggleMode.checked = true;
      }
    }
    function changeTheme(event: any) {
      if (event.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    }
    toggleMode.addEventListener("change", changeTheme);
  };

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
