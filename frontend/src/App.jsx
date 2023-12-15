import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import { FiltersContextProvider } from "./context/FiltersContext";

function App() {
  const { pathname } = useLocation();

  const pagesWithoutNavBar = ["/", "/filters"];

  return (
    <div className="App">
      <div>{!pagesWithoutNavBar.includes(pathname) && <NavBar />}</div>
      <Outlet />
    </div>
  );
}

export default App;
