import { React, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { useUser } from "../context/UserContext";
import FiltersContext from "../context/FiltersContext";

function Connexion({ setConnexion, connexion }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const { userInfos, setUserInfos } = useUser(); // permet de récupérer via un custom Hook l'objet du context (ici l'objet qui contient setUserInfos et UserInfos

  const { setFilterRegime } = useContext(FiltersContext);

  function handleClick(e) {
    e.stopPropagation();
    setConnexion((current) => !current);
  }
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

      try {
        const res2 = await axios.get(
          `http://localhost:3310/api/usertags/${res.data.id}`
        );

        setFilterRegime(res2.data);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return connexion ? (
    <div>
      {userInfos.id && <Navigate to="/browse" />}
      <div className="connexion">
        <div className="connexionModal">
          <div className="closeDiv">
            <button type="button" className="closeButton" onClick={handleClick}>
              &times;
            </button>
          </div>
          <div className="formDiv">
            <div className="title">Connexion {userInfos.pseudo}</div>
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
    </div>
  ) : null;
}

Connexion.propTypes = {
  connexion: PropTypes.bool.isRequired,
  setConnexion: PropTypes.func.isRequired,
};

export default Connexion;
