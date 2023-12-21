import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="home-image">
        <div className="logo">
          <img src="/src/assets/images/logo.png" alt="logo" />
        </div>
        <img src="/src/assets/images/home-img.jpg" alt="img-accueil" />
      </div>
      <div className="home-buttons">
        <NavLink to="/browse">
          <button type="button">Démarrer</button>
        </NavLink>
      </div>
      <div>
        <NavLink to="/signin">
          <p>Pas encore de compte ? Inscrivez-vous</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
