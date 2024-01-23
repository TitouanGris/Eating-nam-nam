import { React, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { useUser } from "../context/UserContext";
import FiltersContext from "../context/FiltersContext";

function Connexion({ setConnexion, connexion }) {
  const [inputPassword, setInputPassword] = useState("");
  const [clickToConnect, setclickToConnect] = useState(false);
  const { userInfos, setUserInfos } = useUser(); // permet de récupérer via un custom Hook l'objet du context (ici l'objet qui contient setUserInfos et UserInfos
  const [inputEmail, setInputEmail] = useState(userInfos.email);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    setFilterRegime,
    setFilterPrice,
    setFilterCountry,
    setFilterDifficulty,
    setFavorisTable,
  } = useContext(FiltersContext);

  async function handleSubmit(event) {
    event.preventDefault();

    // envoie au back les infos (user et password) saisie par l'utilisateur pour authentification

    try {
      const res = await axios.post("http://localhost:3310/api/login", {
        // on INSERT dans la DB avec les infos saisies
        inputEmail,
        inputPassword,
      });

      setUserInfos(res.data);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.id,
          pseudo: res.data.pseudo,
          is_admin: res.data.is_admin,
          email: inputEmail,
          created_date: res.data.created_date,
          updated_date: res.data.updated_date,
          image_url: res.data.image_url,
        })
      );
      try {
        const res2 = await axios.get(
          `http://localhost:3310/api/usertags/${res.data.id}`
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
          `http://localhost:3310/api/favoris/${res.data.id}`
        );

        setFavorisTable(favorisDb.data);

        localStorage.setItem("favoris", JSON.stringify(favorisDb.data));

        setclickToConnect((current) => !current);
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
      {userInfos.id && clickToConnect && <Navigate to="/browse" />}
      <div className="connexion">
        <div className="connexionModal">
          <div className="closeDiv">
            <button type="button" className="closeButton" onClick={handleClick}>
              &times;
            </button>
          </div>
          <div className="formDiv">
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
    </div>
  ) : null;
}

Connexion.propTypes = {
  connexion: PropTypes.bool.isRequired,
  setConnexion: PropTypes.func.isRequired,
};

export default Connexion;
