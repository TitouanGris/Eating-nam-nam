import { createContext, useState, useContext, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import PropTypes from "prop-types";
import FiltersContext from "./FiltersContext";

const UserContext = createContext();

export function UserProvider({ children }) {
  // children permet d'importer le contenu des <> de app
  const [userInfos, setUserInfos] = useState({}); // le state est porté par le UserContext

  const [favorisBtn, setFavorisBtn] = useState(false); // le state est porté par le UserContext

  const location = useLocation();

  const {
    setFilterRegime,
    setFilterPrice,
    setFilterCountry,
    setFilterDifficulty,
    setFavorisTable,
  } = useContext(FiltersContext);

  async function getbytoken() {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/userbytoken`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Inclusion du jeton JWT
          },
        }
      );
      setUserInfos(res.data);

      if (userInfos) {
        // get pour récupérer les préférences utilisations de la DB avec le user ID
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
        } catch (error) {
          console.error(error);
        }
      }

      // setUserInfos
    }
  }

  useEffect(() => {
    getbytoken();
  }, [location.pathname]); // permet de relancer le useEffect à chaque changement de page

  // le useMemo permet de sauvegarder la valeur afin d'éviter des re-render inutile. C'est le tableau de dépendance qui va controller le trigger de MAJ
  const contextValue = useMemo(
    () => ({
      userInfos,
      setUserInfos,
      favorisBtn,
      setFavorisBtn,
    }),
    [userInfos, favorisBtn]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  // optimisation de "custom hook"
  return useContext(UserContext);
}

export default UserContext;

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
