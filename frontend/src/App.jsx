import { useEffect, useState } from "react";

function App() {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/recipe")
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, []);

  return (
    <div className="App">
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
