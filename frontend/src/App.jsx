
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";

function App() {
  const [recipe, setRecipe] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    fetch("http://localhost:3310/api/recipe")
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, []);

  return (
    <div className="App">
      <div>{pathname !== "/" && <NavBar />}</div>
      <Outlet />
    </div>
  );
}

export default App;
