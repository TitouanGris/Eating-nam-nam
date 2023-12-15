import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import { FiltersContextProvider } from "./context/FiltersContext";

function App() {
  const { pathname } = useLocation();

  const pagesWithoutNavBar = ["/", "/filters"];

  return (
    <FiltersContextProvider>
      <div className="App">
        <Outlet />
        <div>{!pagesWithoutNavBar.includes(pathname) && <NavBar />}</div>
      </div>
    </FiltersContextProvider>
  );
}

export default App;
