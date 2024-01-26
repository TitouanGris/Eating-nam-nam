import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { useUser } from "../context/UserContext";
import FiltersContext from "../context/FiltersContext";
import Signin from "./Signin";

function Connexion({ setConnexion, connexion }) {
  const [inputPassword, setInputPassword] = useState("");
  const { userInfos, setUserInfos } = useUser(); // permet de récupérer via un custom Hook l'objet du context (ici l'objet qui contient setUserInfos et UserInfos
  const [inputEmail, setInputEmail] = useState(userInfos.email);
  const [errorMessage, setErrorMessage] = useState("");
  const [inscription, setInscription] = useState(false);

  const {
    setFilterRegime,
    setFilterPrice,
    setFilterCountry,
    setFilterDifficulty,
    setFavorisTable,
  } = useContext(FiltersContext);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    // envoie au back les infos (user et password) saisie par l'utilisateur pour authentification

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          // on INSERT dans la DB avec les infos saisies
          inputEmail,
          inputPassword,
        }
      );
      setUserInfos(res.data.user);

      localStorage.setItem("token", res.data.token);

      // get pour récupérer les préférences utilisations de la DB avec le user ID
      try {
        const res2 = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/usertags/${res.data.user.id}`
        );

        const regimeTable = [];
        const countryTable = [];
        const priceTable = [];
        const difficultyTable = [];

        res2.data.result.forEach((e) => {
          if (e.category_id === 1) {
            priceTable.push(e.name);
          }
          if (e.category_id === 2) {
            countryTable.push(e.name);
          }
          if (e.category_id === 3) {
            regimeTable.push(e.name);
          }
          if (e.category_id === 4) {
            difficultyTable.push(e.name);
          }
        });

        setFilterRegime(regimeTable);
        localStorage.setItem("regimeTable", JSON.stringify(regimeTable));
        setFilterCountry(countryTable);
        localStorage.setItem("countryTable", JSON.stringify(countryTable));
        setFilterPrice(priceTable);
        localStorage.setItem("priceTable", JSON.stringify(priceTable));
        setFilterDifficulty(difficultyTable);
        localStorage.setItem(
          "difficultyTable",
          JSON.stringify(difficultyTable)
        );
      } catch (error) {
        console.error(error);
      }

      // get pour récupérer la table favoris à jour de la DB avec le user ID
      try {
        const favorisDb = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/favoris/${res.data.user.id}`
        );

        setFavorisTable(favorisDb.data);

        localStorage.setItem("favoris", JSON.stringify(favorisDb.data));

        // setclickToConnect((current) => !current);
        setConnexion(!connexion);
        navigate("browse");
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Votre adresse email ou mot de passe est incorrect");
    }
  }

  function handleClick(e) {
    e.stopPropagation();
    setConnexion((current) => !current);
  }

  return connexion ? (
    <div>
      <div className="connexion">
        <div className="connexionModal">
          <div className="closeDiv">
            <button type="button" className="closeButton" onClick={handleClick}>
              &times;
            </button>
          </div>
          <div className="formDiv">
            <div className="title">Connexion</div>
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
          <button
            className="textInscription"
            type="submit"
            onClick={() => setInscription(!inscription)}
          >
            Pas de compte ?{" "}
            <span style={{ textDecoration: "underline" }}>Inscription</span>
          </button>
        </div>
      </div>
      {inscription && (
        <Signin inscription={inscription} setInscription={setInscription} />
      )}
    </div>
  ) : null;
}

Connexion.propTypes = {
  connexion: PropTypes.bool.isRequired,
  setConnexion: PropTypes.func.isRequired,
};

export default Connexion;
