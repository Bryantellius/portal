export const darkModeLoader = () => {
    const toggleMode = document.getElementById("checkbox") as HTMLInputElement;
    const currentMode = localStorage.getItem("theme");
    if (currentMode) {
      document.documentElement.setAttribute("data-theme", currentMode);
      if (currentMode === "DarkOcean") {
        toggleMode.checked = true;
      }
    }
    const handleThemeChange = (event: any) => {
      if (event.target.checked) {
        document.documentElement.setAttribute("data-theme", "DarkOcean");
        localStorage.setItem("theme", "DarkOcean");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    };
    toggleMode.addEventListener("change", handleThemeChange);
  };