import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import Connexion from "../components/Connexion";

function Home() {
  const [connexion, setConnexion] = useState(false);

  function handleClick() {
    setConnexion((current) => !current);
  }

  return (
    <div className="home-container">
      <div className="home-logo">
        <div className="logo-container">
          <img src="/src/assets/images/logo.png" alt="logo" />
        </div>
      </div>

      <div className="home-image">
        <div className="image-container">
          <img src="/src/assets/images/home-img.jpg" alt="img-accueil" />
        </div>
      </div>

      <div className="home-buttons">
        <div className="buttons-container">
          <NavLink to="/browse">
            <Button label="Découvrir" className="button1" />
          </NavLink>
          <Button
            label="Connexion"
            className="button2"
            onClick={() => handleClick()}
          />
          {connexion && <Connexion />}
        </div>
      </div>

      <div className="inscription">
        <NavLink to="/signin">
          <p>Pas encore de compte ? Inscrivez-vous</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
