import { useEffect, useState } from "react";
import Counter from "./components/Counter";
import logo from "./assets/logo.svg";

import "./App.css";

function App() {
  const [recipe, setrecipe] = useState();

  useEffect(() => {
    fetch()
      .then((res) => res.json)
      .then((data) => setrecipe(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React !</p>
        {recipe.map((r) => {
          return (
            <>
              <div style={{ width: "100px", height: "100px", color: "white" }}>
                {" "}
                {r.name}
              </div>
              <div style={{ width: "100px", height: "100px", color: "white" }}>
                {" "}
                {r.summary}
              </div>
            </>
          );
        })}

        <Counter />

        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
