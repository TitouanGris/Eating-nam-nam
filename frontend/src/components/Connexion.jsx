import { React, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

function Connexion() {
  // todo : importer le setter "setUserInfos" via Useconext

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { userInfos, setUserInfos } = useUser(); // permet de récupérer via un custom Hook l'objet du context (ici l'objet qui contient setUserInfos et UserInfos

  async function handleSubmit(event) {
    event.preventDefault();

    // POST vers BACK

    try {
      const res = await axios.post("http://localhost:3310/api/login", {
        // on INSERT dans la DB avec les infos saisies
        inputEmail,
        inputPassword,
      });

      setUserInfos(res.data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Votre adresse email ou mot de passe est incorrect");
    }
  }

  return (
    <div>
      {userInfos.id && <Navigate to="/browse" />}
      <div className="connexion">
        <div className="connexionModal">
          <div className="title">Connexion {userInfos.pseudo}</div>
          {errorMessage && <p>{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="Email"
              placeholder="E-mail"
              onChange={(e) => setInputEmail(e.target.value)}
            />
            <input
              type="password"
              name="Password"
              placeholder="password"
              onChange={(e) => setInputPassword(e.target.value)}
            />
            <button className="button1 connexionBtn" type="submit">
              Je me connecte{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
