import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      <div>{pathname !== "/" && <NavBar />}</div>
      <Outlet />
    </div>
  );
}

export default App;
