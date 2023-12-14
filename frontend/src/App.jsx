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
      <div>
        <Outlet />
      </div>
      {recipe.map((r) => {
        return (
          <div key={r.id}>
            <div style={{ width: "100px", height: "100px" }}> {r.name}</div>
            <div style={{ width: "100px", height: "100px" }}> {r.summary}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
