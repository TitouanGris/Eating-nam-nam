import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import Connexion from "../components/Connexion";
import Signin from "../components/Signin";

function Home() {
  const [connexion, setConnexion] = useState(false);
  const [inscription, setInscription] = useState(false);
  function handleClick1() {
    setConnexion((current) => !current);
  }
  function handleClick2() {
    setInscription((current) => !current);
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
            onClick={() => handleClick1()}
          />
          {connexion && <Connexion />}
          <Button
            label="Pas encore de compte ? Inscrivez-vous !"
            className="button3"
            onClick={() => handleClick2()}
          />
          {inscription && <Signin />}
        </div>
      </div>
    </div>
  );
}

export default Home;
