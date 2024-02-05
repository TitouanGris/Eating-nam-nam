import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import Connexion from "../components/Connexion";
import Signin from "../components/Signin";
import { useUser } from "../context/UserContext";

function Home() {
  const [connexion, setConnexion] = useState(false);
  const { setUserInfos } = useUser();
  const [inscription, setInscription] = useState(false);
  function handleClick1() {
    setConnexion(true);
  }
  function handleClick2() {
    setInscription((current) => !current);
  }

  return (
    <div className="home-container">
      <div className="home-logo">
        <div className="logo-container">
          <img src="/logo.png" alt="logo" />
        </div>
      </div>

      <div className="home-image">
        <div className="image-container">
          <img src="/home-img.jpg" alt="img-accueil" />
        </div>
      </div>

      <div className="home-buttons">
        <div className="buttons-container">
          <Button
            label="Inscription"
            className="button1"
            onClick={() => handleClick2()}
          />
          {inscription && (
            <Signin inscription={inscription} setInscription={setInscription} />
          )}
          <Button
            label="Connexion"
            className="button2"
            onClick={() => handleClick1()}
          />
          {connexion && (
            <Connexion connexion={connexion} setConnexion={setConnexion} />
          )}
          <NavLink to="/browse">
            <Button
              label="Continuer sans se connecter"
              className="button3"
              onClick={() => {
                localStorage.clear();
                setUserInfos({});
              }}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
