import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useUser } from "../context/UserContext";
// import { loadIngredientsData } from "../pages/RecipePost";
import { loadFiltersData } from "./Filters";
import Button from "./Button";
import FilterRegime from "./FilterRegime";
import FilterCountry from "./FilterCountry";
import FilterPrice from "./FilterPrice";
import FiltersContext from "../context/FiltersContext";
import FilterDifficuly from "./FilterDifficuly";

function Regime({ successMessage, setShowModifyPreferences }) {
  const [filterChip, setFilterChip] = useState([]);

  const [validate, setValidate] = useState(false);

  const { userInfos } = useUser();

  const {
    filterRegimeId,
    setFilterRegimeId,
    filterPriceId,
    setFilterPriceId,
    filterCountryId,
    setFilterCountryId,
    filterDifficultyId,
    setFilterDifficultyId,
  } = useContext(FiltersContext);

  const [regimeChange, setRegimeChange] = useState([]);
  const [priceChange, setPriceChange] = useState([]);
  const [countryChange, setCountryChange] = useState([]);
  const [difficultyChange, setDifficultyChange] = useState([]);

  // on récupère les données en important le loader filter
  async function loadData() {
    const filter = await loadFiltersData();
    setFilterChip(filter);
  }

  // le use effect est nécéssaire pour accompagner l'effet async
  useEffect(() => {
    loadData();
  }, []);

  // on ne récupère que les filter avec tag id 3 (pour les régimes)
  const regimeTag = filterChip.filter((tag) => tag.category_id === 3);
  // on ne récupère que les filter avec tag id 2 (pour les pays)
  const countryTag = filterChip.filter((tag) => tag.category_id === 2);
  // on ne récupère que les filter avec tag id 1 (pour les prix)
  const priceTag = filterChip.filter((tag) => tag.category_id === 1);

  // on ne récupère que les filter avec tag id 4 (pour les difficulté)
  const difficultyTag = filterChip.filter((tag) => tag.category_id === 4);

  const navigate = useNavigate();
  const location = useLocation();

  async function handleValidate() {
    let filterIdChosen = [];
    if (location.pathname === "/account") {
      filterIdChosen = [
        regimeChange,
        priceChange,
        countryChange,
        difficultyChange,
      ];
      setShowModifyPreferences(false);
    } else {
      filterIdChosen = [
        filterRegimeId,
        filterPriceId,
        filterCountryId,
        filterDifficultyId,
      ];
      setValidate((current) => !current);
      setTimeout(() => {
        navigate("/browse");
      }, 2000);
    }

    try {
      const filterIdChosenReduced = filterIdChosen.reduce(
        (acc, currentArray) => acc.concat(currentArray),
        []
      );
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usertags`, {
        // on INSERT dans la DB avec les infos saisies
        userInfosId: userInfos.id,
        filterIdChosenReduced,
      });
      setFilterRegimeId(filterIdChosenReduced);
      setFilterCountryId(filterIdChosenReduced);
      setFilterPriceId(filterIdChosenReduced);
      setFilterDifficultyId(filterIdChosenReduced);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="regime-container">
      {validate && (
        <div className="message">
          <p> {successMessage}</p>
        </div>
      )}

      {!validate && (
        <div className="regime">
          <p>Sélectionner vos préférences (si vous en avez)</p>

          <div className="regimeTag">
            <FilterRegime
              regimeTag={regimeTag}
              setRegimeChange={setRegimeChange}
              regimeChange={regimeChange}
            />
          </div>

          <div className="CountryTag">
            <FilterCountry
              countryTag={countryTag}
              setCountryChange={setCountryChange}
              countryChange={countryChange}
            />
          </div>

          <div className="priceTag">
            <FilterPrice
              priceTag={priceTag}
              setPriceChange={setPriceChange}
              priceChange={priceChange}
            />
          </div>

          <div className="difficultyTag">
            <FilterDifficuly
              difficultyTag={difficultyTag}
              setDifficultyChange={setDifficultyChange}
              difficultyChange={difficultyChange}
            />
          </div>
          <div className="validateBtn">
            <Button
              label="Valider"
              // eslint-disable-next-line react/jsx-no-bind
              onClick={handleValidate}
              className="button1"
            />
          </div>
        </div>
      )}
    </div>
  );
}

Regime.propTypes = {
  successMessage: PropTypes.string.isRequired,
  setShowModifyPreferences: PropTypes.bool.isRequired,
};

export default Regime;
