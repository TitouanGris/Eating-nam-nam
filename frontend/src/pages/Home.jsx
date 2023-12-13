import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <img src="/images/logo.png" alt="logo" />
      <img src="/images/home-img.jpg" alt="img-accueil" />
      <div className="home-buttons">
        <NavLink to="/RecipeBrowse">
          <button type="button">Démarrer</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
