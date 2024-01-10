import { React, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import FiltersContext from "../context/FiltersContext";

function Connexion() {
  // todo : importer le setter "setUserInfos" via Useconext

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const { userInfos, setUserInfos } = useUser(); // permet de récupérer via un custom Hook l'objet du context (ici l'objet qui contient setUserInfos et UserInfos

  const {
    setFilterRegime,
    setFilterPrice,
    setFilterCountry,
    setFilterDifficulty,
  } = useContext(FiltersContext);

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
        setFilterCountry(countryTable);
        setFilterPrice(priceTable);
        setFilterDifficulty(difficultyTable);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {userInfos.id && <Navigate to="/browse" />}
      <div className="connexion">
        <div className="connexionModal">
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
  );
}

export default Connexion;
