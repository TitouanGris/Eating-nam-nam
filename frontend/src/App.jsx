import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import { FiltersContextProvider } from "./context/FiltersContext";

function App() {
  const { pathname } = useLocation();

  return (
    <FiltersContextProvider>
      <div className="App">
        <div>{pathname !== "/" && <NavBar />}</div>
        <Outlet />
      </div>
    </FiltersContextProvider>
  );
}

export default App;
